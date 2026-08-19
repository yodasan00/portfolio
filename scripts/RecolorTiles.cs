using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace Portfolio
{
    public class TileRecolorer
    {
        // Convert a purple pixel (R~91, G~82, B~128) to warm wooden floor
        public static Color RecolorFloor(Color c)
        {
            if (c.A == 0) return c;
            
            // Calculate brightness
            double gray = 0.299 * c.R + 0.587 * c.G + 0.114 * c.B;
            double factor = gray / 255.0;

            // Warm golden cedar wood tones: Base (155, 115, 75)
            int r = (int)Math.Min(255, factor * 195 + 25);
            int g = (int)Math.Min(255, factor * 145 + 18);
            int b = (int)Math.Min(255, factor * 95 + 10);

            return Color.FromArgb(c.A, r, g, b);
        }

        // Convert purple wall pixels to cozy botanical olive/sage slate wall
        public static Color RecolorWall(Color c)
        {
            if (c.A == 0) return c;

            double gray = 0.299 * c.R + 0.587 * c.G + 0.114 * c.B;
            double factor = gray / 255.0;

            // Deep botanical olive / sage wallpaper: Base (55, 68, 52)
            int r = (int)Math.Min(255, factor * 90 + 28);
            int g = (int)Math.Min(255, factor * 115 + 38);
            int b = (int)Math.Min(255, factor * 85 + 26);

            return Color.FromArgb(c.A, r, g, b);
        }

        public static void ProcessFiles(string dir)
        {
            string[] floorFiles = new string[] {
                "walkFloor_1.png", "walkFloor_2.png", "walkFloor_3.png", "walkFloor_4.png",
                "collideBottomWall_0.png", "collideBottomWall_1.png", "collideBottomWall_2.png"
            };

            foreach (string f in floorFiles)
            {
                string path = Path.Combine(dir, f);
                if (File.Exists(path))
                {
                    using (Bitmap bmp = new Bitmap(path))
                    using (Bitmap outBmp = new Bitmap(bmp.Width, bmp.Height, PixelFormat.Format32bppArgb))
                    {
                        for (int y = 0; y < bmp.Height; y++)
                        {
                            for (int x = 0; x < bmp.Width; x++)
                            {
                                Color c = bmp.GetPixel(x, y);
                                outBmp.SetPixel(x, y, RecolorFloor(c));
                            }
                        }
                        bmp.Dispose();
                        outBmp.Save(path, ImageFormat.Png);
                    }
                    Console.WriteLine("Recolored floor: " + f);
                }
            }

            string[] wallFiles = new string[] {
                "collideTopWall_1.png", "collideTopWall_2.png", "collideTopWall_3.png",
                "collideLeftWall_0.png", "collideRightWall_0.png",
                "collideTopWallColumnLeft_1.png", "collideTopWallColumnLeft_2.png", "collideTopWallColumnLeft_3.png", "collideTopWallColumnLeft_4.png",
                "collideTopWallColumnRight_1.png", "collideTopWallColumnRight_2.png", "collideTopWallColumnRight_3.png", "collideTopWallColumnRight_4.png",
                "collideTopWallColumnBorderLeft_1.png", "collideTopWallColumnBorderRight_1.png"
            };

            foreach (string f in wallFiles)
            {
                string path = Path.Combine(dir, f);
                if (File.Exists(path))
                {
                    using (Bitmap bmp = new Bitmap(path))
                    using (Bitmap outBmp = new Bitmap(bmp.Width, bmp.Height, PixelFormat.Format32bppArgb))
                    {
                        for (int y = 0; y < bmp.Height; y++)
                        {
                            for (int x = 0; x < bmp.Width; x++)
                            {
                                Color c = bmp.GetPixel(x, y);
                                outBmp.SetPixel(x, y, RecolorWall(c));
                            }
                        }
                        bmp.Dispose();
                        outBmp.Save(path, ImageFormat.Png);
                    }
                    Console.WriteLine("Recolored wall: " + f);
                }
            }
        }
    }
}
