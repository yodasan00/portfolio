using System;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;

namespace Portfolio
{
    public class PaletteHelper
    {
        public static void Analyze(string file)
        {
            using (Bitmap bmp = new Bitmap(file))
            {
                Dictionary<string, int> counts = new Dictionary<string, int>();
                for (int y = 0; y < bmp.Height; y++)
                {
                    for (int x = 0; x < bmp.Width; x++)
                    {
                        Color c = bmp.GetPixel(x, y);
                        if (c.A > 20)
                        {
                            string hex = string.Format("#{0:X2}{1:X2}{2:X2}", c.R, c.G, c.B);
                            if (!counts.ContainsKey(hex)) counts[hex] = 0;
                            counts[hex]++;
                        }
                    }
                }
                var top = counts.OrderByDescending(kv => kv.Value).Take(15);
                Console.WriteLine("Palette for " + file + ":");
                foreach (var kv in top)
                {
                    Console.WriteLine("  " + kv.Key + " => " + kv.Value);
                }
            }
        }
    }
}
