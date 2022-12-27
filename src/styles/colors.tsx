import { z } from "zod";
import {
  useState,
  FC,
  ReactNode,
  memo,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { useMemo } from "react";

export type Color = keyof typeof colors;

const themeKey = "poteboy-theme";
const themeSchema = z.enum(["light", "dark"]);
type ThemeMode = z.infer<typeof themeSchema>;

// styles.cssに合わせる
export const colors = {
  baseBg: "var(--base-bg)",
} as const;

const colorFromStorage = () => {
  const result = themeSchema.safeParse(localStorage.getItem(themeKey));
  if (result.success) return result.data;
  else return "dark";
};

export const useColorTheme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.body.dataset.theme!);
  }, []);

  const changeTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
  }, [theme]);

  const isDarkMode = useMemo(() => theme === "dark", [theme]);

  return { changeTheme, isDarkMode };
};

export const ThemeProvider: FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    useLayoutEffect(() => {
      const result = colorFromStorage();
      document.body.dataset.theme = result;
    }, []);
    return <>{children}</>;
  },
  (_prev, _curr) => true
);
