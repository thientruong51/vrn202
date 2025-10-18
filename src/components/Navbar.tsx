// components/Navbar.tsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // ✅ thêm

interface NavbarProps {
  onNavigate: (section: string) => void;
  active?: string;
}

const MENU = [
  { id: "home", label: "Flipbook CMT8" },
  { id: "quiz", label: "Quiz" },
  { id: "comparison", label: "Thông điệp" },
  { id: "transparency", label: "Tính minh bạch AI", route: "/transparency-ai" },
  { id: "qa", label: "Q&A", link: "https://padlet.com/trilm32/ai1805-7lvete4y5bhccuel" },
];

export default function Navbar({ onNavigate, active }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // ✅ hook điều hướng

  const handleClick = (m: typeof MENU[number]) => {
    if (m.link) {
      window.open(m.link, "_blank");
    } else if (m.route) {
      navigate(m.route);
    } else {
      onNavigate(m.id);
    }
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        bgcolor: "rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* ✅ Logo có link về trang chủ */}
        <Typography
          onClick={() => navigate("/")}
          sx={{
            fontWeight: 800,
            color: "#eeb72b",
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          VRN202_AI1805
        </Typography>

        {/* Desktop menu */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1, ml: 4 }}>
            {MENU.map((m) => (
              <Button
                key={m.id}
                onClick={() => handleClick(m)}
                sx={{
                  color: active === m.id ? "#eeb72b" : "rgba(255,255,255,0.8)",
                  textTransform: "none",
                  fontWeight: active === m.id ? 700 : 500,
                  borderBottom:
                    active === m.id
                      ? "2px solid #eeb72b"
                      : "2px solid transparent",
                  borderRadius: 0,
                  "&:hover": { color: "#eeb72b" },
                }}
              >
                {m.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Spirit button */}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#eeb72b",
            color: "#000",
            fontWeight: 700,
            "&:hover": { bgcolor: "#ffd77a" },
          }}
        >
          Nhóm All for one
        </Button>

        {/* Mobile menu */}
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              sx={{ ml: 2 }}
            >
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={() => setOpen(false)}
              PaperProps={{
                sx: { bgcolor: "rgba(0,0,0,0.9)", color: "#fff", width: 240 },
              }}
            >
              <List>
                {MENU.map((m) => (
                  <ListItem key={m.id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleClick(m);
                        setOpen(false);
                      }}
                      selected={active === m.id}
                      sx={{
                        "&.Mui-selected": {
                          bgcolor: "rgba(238,183,43,0.15)",
                          color: "#eeb72b",
                        },
                      }}
                    >
                      <ListItemText primary={m.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
