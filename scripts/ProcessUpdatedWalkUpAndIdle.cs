using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;

namespace Portfolio
{
    public class WalkUpAndIdleProcessor
    {
        private static bool IsBg(Color c, Color bg)
        {
            if (c.A < 20) return true;
            int dr = c.R - bg.R;
            int dg = c.G - bg.G;
            int db = c.B - bg.B;
            return Math.Sqrt(dr * dr + dg * dg + db * db) < 35.0 || (c.R > 245 && c.G > 245 && c.B > 245);
        }

        public static Bitmap RemoveBackground(string filePath)
        {
            using (Bitmap src = new Bitmap(filePath))
            {
                int w = src.Width;
                int h = src.Height;
                Bitmap outBmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);

                for (int y = 0; y < h; y++)
                {
                    for (int x = 0; x < w; x++)
                    {
                        outBmp.SetPixel(x, y, src.GetPixel(x, y));
                    }
                }

                Color bg = src.GetPixel(2, 2);
                bool[,] visited = new bool[w, h];
                Queue<Point> q = new Queue<Point>();

                for (int x = 0; x < w; x++)
                {
                    if (IsBg(outBmp.GetPixel(x, 0), bg)) { q.Enqueue(new Point(x, 0)); visited[x, 0] = true; }
                    if (IsBg(outBmp.GetPixel(x, h - 1), bg)) { q.Enqueue(new Point(x, h - 1)); visited[x, h - 1] = true; }
                }
                for (int y = 0; y < h; y++)
                {
                    if (IsBg(outBmp.GetPixel(0, y), bg)) { q.Enqueue(new Point(0, y)); visited[0, y] = true; }
                    if (IsBg(outBmp.GetPixel(w - 1, y), bg)) { q.Enqueue(new Point(w - 1, y)); visited[w - 1, y] = true; }
                }

                while (q.Count > 0)
                {
                    Point p = q.Dequeue();
                    outBmp.SetPixel(p.X, p.Y, Color.FromArgb(0, 0, 0, 0));

                    int[] dx = new int[] { 0, 0, 1, -1 };
                    int[] dy = new int[] { 1, -1, 0, 0 };

                    for (int i = 0; i < 4; i++)
                    {
                        int nx = p.X + dx[i];
                        int ny = p.Y + dy[i];

                        if (nx >= 0 && nx < w && ny >= 0 && ny < h && !visited[nx, ny])
                        {
                            visited[nx, ny] = true;
                            if (IsBg(outBmp.GetPixel(nx, ny), bg))
                            {
                                q.Enqueue(new Point(nx, ny));
                            }
                        }
                    }
                }
                return outBmp;
            }
        }

        public static Rectangle FindBounds(Bitmap bmp, int startX, int endX, int startY = 0, int endY = -1)
        {
            if (endY == -1) endY = bmp.Height;
            int minX = bmp.Width, maxX = -1, minY = bmp.Height, maxY = -1;
            for (int y = startY; y < endY; y++)
            {
                for (int x = startX; x < endX; x++)
                {
                    if (bmp.GetPixel(x, y).A > 30)
                    {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            if (maxX < minX || maxY < minY) return Rectangle.Empty;
            return new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
        }

        public static void BuildWalkUpSheet(string inputPath, string outputPath, int targetFrameW = 105, int targetFrameH = 115)
        {
            using (Bitmap transparent = RemoveBackground(inputPath))
            {
                int w = transparent.Width;
                Rectangle[] bounds = new Rectangle[4];
                int quarter = w / 4;

                for (int i = 0; i < 4; i++)
                {
                    bounds[i] = FindBounds(transparent, i * quarter, (i + 1) * quarter);
                    Console.WriteLine("WalkUp Frame " + i + ": " + bounds[i]);
                }

                int totalW = targetFrameW * 4;
                int totalH = targetFrameH;

                using (Bitmap sheet = new Bitmap(totalW, totalH, PixelFormat.Format32bppArgb))
                using (Graphics g = Graphics.FromImage(sheet))
                {
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.NearestNeighbor;
                    g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.Half;

                    for (int i = 0; i < 4; i++)
                    {
                        if (bounds[i] != Rectangle.Empty)
                        {
                            double scale = Math.Min((double)(targetFrameH - 10) / bounds[i].Height, (double)(targetFrameW - 10) / bounds[i].Width);
                            int dw = (int)(bounds[i].Width * scale);
                            int dh = (int)(bounds[i].Height * scale);

                            int dx = i * targetFrameW + (targetFrameW - dw) / 2;
                            int dy = targetFrameH - dh - 4; // align to bottom

                            g.DrawImage(transparent, new Rectangle(dx, dy, dw, dh), bounds[i], GraphicsUnit.Pixel);
                        }
                    }

                    string dir = Path.GetDirectoryName(outputPath);
                    if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir)) Directory.CreateDirectory(dir);

                    sheet.Save(outputPath, ImageFormat.Png);
                    Console.WriteLine("Saved compiled WalkUp sheet to: " + outputPath);
                }
            }
        }

        public static void BuildIdleSheet(string inputPath, string outputPath, int targetFrameW = 105, int targetFrameH = 115)
        {
            using (Bitmap transparent = RemoveBackground(inputPath))
            {
                Rectangle bounds = FindBounds(transparent, 0, transparent.Width);
                Console.WriteLine("Idle Character bounds: " + bounds);

                int totalW = targetFrameW * 4;
                int totalH = targetFrameH;

                using (Bitmap sheet = new Bitmap(totalW, totalH, PixelFormat.Format32bppArgb))
                using (Graphics g = Graphics.FromImage(sheet))
                {
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.NearestNeighbor;
                    g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.Half;

                    double scale = Math.Min((double)(targetFrameH - 10) / bounds.Height, (double)(targetFrameW - 10) / bounds.Width);
                    int dw = (int)(bounds.Width * scale);
                    int dh = (int)(bounds.Height * scale);

                    for (int i = 0; i < 4; i++)
                    {
                        int dx = i * targetFrameW + (targetFrameW - dw) / 2;
                        // Subtle breathing cycle: 0px, -1px, 0px, -1px
                        int breathY = (i % 2 == 1) ? -1 : 0;
                        int dy = targetFrameH - dh - 4 + breathY;

                        g.DrawImage(transparent, new Rectangle(dx, dy, dw, dh), bounds, GraphicsUnit.Pixel);
                    }

                    string dir = Path.GetDirectoryName(outputPath);
                    if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir)) Directory.CreateDirectory(dir);

                    sheet.Save(outputPath, ImageFormat.Png);
                    Console.WriteLine("Saved compiled Idle sheet to: " + outputPath);
                }
            }
        }
    }
}
