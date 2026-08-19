$csharpCode = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class SpriteCropper
{
    public static void CropAndFloodFill(string sourcePath, int rx, int ry, int rw, int rh, string outputPath, int threshold = 230)
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

                bool IsBgWhite(int x, int y)
                {
                    if (x < 0 || x >= w || y < 0 || y >= h) return false;
                    Color c = cropped.GetPixel(x, y);
                    return (c.R >= threshold && c.G >= threshold && c.B >= threshold);
                }

                // Seed borders
                for (int x = 0; x < w; x++)
                {
                    if (IsBgWhite(x, 0)) { queue.Enqueue(new Point(x, 0)); visited[x, 0] = true; }
                    if (IsBgWhite(x, h - 1)) { queue.Enqueue(new Point(x, h - 1)); visited[x, h - 1] = true; }
                }
                for (int y = 0; y < h; y++)
                {
                    if (IsBgWhite(0, y)) { queue.Enqueue(new Point(0, y)); visited[0, y] = true; }
                    if (IsBgWhite(w - 1, y)) { queue.Enqueue(new Point(w - 1, y)); visited[w - 1, y] = true; }
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

                    foreach (var n in neighbors)
                    {
                        if (n.X >= 0 && n.X < w && n.Y >= 0 && n.Y < h)
                        {
                            if (!visited[n.X, n.Y] && IsBgWhite(n.X, n.Y))
                            {
                                visited[n.X, n.Y] = true;
                                queue.Enqueue(n);
                            }
                        }
                    }
                }

                // Find content bounds
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
                        Console.WriteLine($"Saved trimmed {outputPath} ({finalW}x{finalH})");
                    }
                }
                else
                {
                    cropped.Save(outputPath, ImageFormat.Png);
                    Console.WriteLine($"Saved {outputPath}");
                }
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharpCode -ReferencedAssemblies System.Drawing

$src = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787176024517.jpg"
$dest = "d:\portfolio\src\assets\images\game"

# 1. Computer Desk
[SpriteCropper]::CropAndFloodFill($src, 20, 50, 360, 420, "$dest\botanical_computer.png", 235)

# 2. TV Console
[SpriteCropper]::CropAndFloodFill($src, 380, 50, 300, 420, "$dest\botanical_tv.png", 235)

# 3. Bed
[SpriteCropper]::CropAndFloodFill($src, 670, 50, 330, 480, "$dest\botanical_bed.png", 235)

# 4. Rug
[SpriteCropper]::CropAndFloodFill($src, 20, 480, 330, 470, "$dest\botanical_carpet.png", 235)

# 5. Plant Shelf
[SpriteCropper]::CropAndFloodFill($src, 340, 470, 330, 470, "$dest\botanical_shelf.png", 235)

# 6. Backpack
[SpriteCropper]::CropAndFloodFill($src, 680, 550, 310, 370, "$dest\botanical_backpack.png", 235)

Write-Host "C# Cropper completed with perfect flood fill!"
