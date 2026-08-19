using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;

namespace Portfolio
{
    public class AvatarProcessor
    {
        private static bool IsBgColor(Color c, Color bg)
        {
            int dr = c.R - bg.R;
            int dg = c.G - bg.G;
            int db = c.B - bg.B;
            return Math.Sqrt(dr * dr + dg * dg + db * db) < 45.0;
        }

        public static void MakeTransparentAndSave(string inputJpg, string outputPng)
        {
            using (Bitmap src = new Bitmap(inputJpg))
            using (Bitmap outBmp = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
            {
                int w = src.Width;
                int h = src.Height;

                for (int y = 0; y < h; y++)
                {
                    for (int x = 0; x < w; x++)
                    {
                        outBmp.SetPixel(x, y, src.GetPixel(x, y));
                    }
                }

                Color bg = src.GetPixel(5, 5);
                Console.WriteLine("Sampled BG Color: R=" + bg.R + ", G=" + bg.G + ", B=" + bg.B);

                bool[,] visited = new bool[w, h];
                Queue<Point> q = new Queue<Point>();

                for (int x = 0; x < w; x++)
                {
                    if (IsBgColor(outBmp.GetPixel(x, 0), bg)) { q.Enqueue(new Point(x, 0)); visited[x, 0] = true; }
                    if (IsBgColor(outBmp.GetPixel(x, 1), bg)) { q.Enqueue(new Point(x, 1)); visited[x, 1] = true; }
                }
                for (int y = 0; y < h; y++)
                {
                    if (IsBgColor(outBmp.GetPixel(0, y), bg)) { q.Enqueue(new Point(0, y)); visited[0, y] = true; }
                    if (IsBgColor(outBmp.GetPixel(1, y), bg)) { q.Enqueue(new Point(1, y)); visited[1, y] = true; }
                    if (IsBgColor(outBmp.GetPixel(w - 1, y), bg)) { q.Enqueue(new Point(w - 1, y)); visited[w - 1, y] = true; }
                    if (IsBgColor(outBmp.GetPixel(w - 2, y), bg)) { q.Enqueue(new Point(w - 2, y)); visited[w - 2, y] = true; }
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
                            if (IsBgColor(outBmp.GetPixel(nx, ny), bg))
                            {
                                q.Enqueue(new Point(nx, ny));
                            }
                        }
                    }
                }

                string dir = Path.GetDirectoryName(outputPng);
                if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }

                outBmp.Save(outputPng, ImageFormat.Png);
                Console.WriteLine("Successfully saved transparent avatar to " + outputPng);
            }
        }
    }
}
