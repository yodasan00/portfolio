using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;

namespace Portfolio
{
    public class MenuIconsCropper
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

        public static Rectangle FindBounds(Bitmap bmp, int startX, int endX, int startY, int endY)
        {
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

        // Create 2-frame sprite sheet (320x135) for each menu item
        public static void CreateMenuSheet(Bitmap transparent, Rectangle iconBounds, string outputPath)
        {
            int frameW = 160;
            int frameH = 135;
            int totalW = frameW * 2;
            int totalH = frameH;

            using (Bitmap sheet = new Bitmap(totalW, totalH, PixelFormat.Format32bppArgb))
            using (Graphics g = Graphics.FromImage(sheet))
            {
                g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.NearestNeighbor;
                g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.Half;

                // Scale to fit 160x135
                double scale = Math.Min((double)(frameH - 12) / iconBounds.Height, (double)(frameW - 12) / iconBounds.Width);
                int dw = (int)(iconBounds.Width * scale);
                int dh = (int)(iconBounds.Height * scale);

                // Frame 1: Normal idle state (centered)
                int dx1 = (frameW - dw) / 2;
                int dy1 = (frameH - dh) / 2;
                g.DrawImage(transparent, new Rectangle(dx1, dy1, dw, dh), iconBounds, GraphicsUnit.Pixel);

                // Frame 2: Hover state (raised slightly with hover energy)
                int dx2 = frameW + (frameW - dw) / 2;
                int dy2 = (frameH - dh) / 2 - 4; // slightly floating up
                g.DrawImage(transparent, new Rectangle(dx2, dy2, dw, dh), iconBounds, GraphicsUnit.Pixel);

                string dir = Path.GetDirectoryName(outputPath);
                if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir)) Directory.CreateDirectory(dir);

                sheet.Save(outputPath, ImageFormat.Png);
                Console.WriteLine("Saved menu sprite sheet: " + outputPath);
            }
        }

        public static void Process(string inputImg, string outputDir)
        {
            using (Bitmap transparent = RemoveBackground(inputImg))
            {
                int w = transparent.Width;
                // Exclude text labels at bottom (text is roughly from y=340 to 512)
                int contentMaxY = (int)(transparent.Height * 0.72);

                int quarter = w / 4;
                string[] fileNames = new string[] {
                    "mew2-Sheet.png",       // 1. Full Experience
                    "paper2-Sheet.png",      // 2. Resume
                    "computer2-Sheet.png",   // 3. YaadOS Desktop
                    "videoGame2-Sheet.png"   // 4. Video Game
                };

                for (int i = 0; i < 4; i++)
                {
                    Rectangle bounds = FindBounds(transparent, i * quarter, (i + 1) * quarter, 0, contentMaxY);
                    Console.WriteLine("Icon " + i + " bounds: " + bounds);
                    string outPath = Path.Combine(outputDir, fileNames[i]);
                    CreateMenuSheet(transparent, bounds, outPath);
                }
            }
        }
    }
}
