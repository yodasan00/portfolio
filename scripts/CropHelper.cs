using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

namespace Portfolio
{
    public class SpriteCropper
    {
        private static bool IsBg(Color c, int threshold)
        {
            return (c.R >= threshold && c.G >= threshold && c.B >= threshold);
        }

        public static void CropAndFloodFill(string sourcePath, int rx, int ry, int rw, int rh, string outputPath, int threshold)
        {
            using (Bitmap src = new Bitmap(sourcePath))
            {
                Rectangle rect = new Rectangle(rx, ry, rw, rh);
                using (Bitmap cropped = new Bitmap(rw, rh, PixelFormat.Format32bppArgb))
                {
                    using (Graphics g = Graphics.FromImage(cropped))
                    {
                        g.DrawImage(src, new Rectangle(0, 0, rw, rh), rect, GraphicsUnit.Pixel);
                    }

                    int w = cropped.Width;
                    int h = cropped.Height;
                    bool[,] visited = new bool[w, h];
                    Queue<Point> queue = new Queue<Point>();

                    for (int x = 0; x < w; x++)
                    {
                        if (IsBg(cropped.GetPixel(x, 0), threshold)) { queue.Enqueue(new Point(x, 0)); visited[x, 0] = true; }
                        if (IsBg(cropped.GetPixel(x, h - 1), threshold)) { queue.Enqueue(new Point(x, h - 1)); visited[x, h - 1] = true; }
                    }
                    for (int y = 0; y < h; y++)
                    {
                        if (IsBg(cropped.GetPixel(0, y), threshold)) { queue.Enqueue(new Point(0, y)); visited[0, y] = true; }
                        if (IsBg(cropped.GetPixel(w - 1, y), threshold)) { queue.Enqueue(new Point(w - 1, y)); visited[w - 1, y] = true; }
                    }

                    while (queue.Count > 0)
                    {
                        Point p = queue.Dequeue();
                        cropped.SetPixel(p.X, p.Y, Color.FromArgb(0, 0, 0, 0));

                        Point[] neighbors = new Point[]
                        {
                            new Point(p.X + 1, p.Y),
                            new Point(p.X - 1, p.Y),
                            new Point(p.X, p.Y + 1),
                            new Point(p.X, p.Y - 1)
                        };

                        foreach (Point n in neighbors)
                        {
                            if (n.X >= 0 && n.X < w && n.Y >= 0 && n.Y < h)
                            {
                                if (!visited[n.X, n.Y] && IsBg(cropped.GetPixel(n.X, n.Y), threshold))
                                {
                                    visited[n.X, n.Y] = true;
                                    queue.Enqueue(n);
                                }
                            }
                        }
                    }

                    int minX = w, minY = h, maxX = 0, maxY = 0;
                    for (int y = 0; y < h; y++)
                    {
                        for (int x = 0; x < w; x++)
                        {
                            Color c = cropped.GetPixel(x, y);
                            if (c.A > 0)
                            {
                                if (x < minX) minX = x;
                                if (x > maxX) maxX = x;
                                if (y < minY) minY = y;
                                if (y > maxY) maxY = y;
                            }
                        }
                    }

                    if (maxX >= minX && maxY >= minY)
                    {
                        int finalW = maxX - minX + 1;
                        int finalH = maxY - minY + 1;
                        using (Bitmap trimmed = new Bitmap(finalW, finalH, PixelFormat.Format32bppArgb))
                        {
                            using (Graphics tg = Graphics.FromImage(trimmed))
                            {
                                tg.DrawImage(cropped, new Rectangle(0, 0, finalW, finalH), new Rectangle(minX, minY, finalW, finalH), GraphicsUnit.Pixel);
                            }
                            trimmed.Save(outputPath, ImageFormat.Png);
                            Console.WriteLine("Saved trimmed " + outputPath + " (" + finalW + "x" + finalH + ")");
                        }
                    }
                    else
                    {
                        cropped.Save(outputPath, ImageFormat.Png);
                        Console.WriteLine("Saved " + outputPath);
                    }
                }
            }
        }
    }
}
