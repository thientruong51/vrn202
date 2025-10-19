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
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  onNavigate?: (section: string) => void;
  active?: string;
}

const MENU = [
  { id: "home", label: "Flipbook CMT8", route: "/" },
  { id: "quiz", label: "Quiz", route: "/quiz" },
  { id: "chatbox", label: "Chatbox AF1", route: "/chatbox" },
  { id: "transparency", label: "Tính minh bạch AI", route: "/transparency-ai" },
  { id: "qa", label: "Q&A", route: "/qa" },

];

export default function Navbar({ onNavigate, active }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Xác định route hiện tại để highlight
  const currentPath = location.pathname;
  const isActive = (m: typeof MENU[number]) => {
    if (m.route) return m.route === currentPath;
    return active === m.id;
  };

  const handleClick = (m: typeof MENU[number]) => {
  if (m.route) {
    navigate(m.route);
    window.scrollTo({ top: 0, behavior: "smooth" }); // cuộn lên đầu trang khi đổi route
  } else if (onNavigate) {
    onNavigate(m.id); // cho trường hợp Hero có scroll nội trang
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
        {/* Logo → Về trang chủ */}
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

        {/* MENU cho desktop */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1, ml: 4 }}>
            {MENU.map((m) => (
              <Button
                key={m.id}
                onClick={() => handleClick(m)}
                sx={{
                  color: isActive(m) ? "#eeb72b" : "rgba(255,255,255,0.8)",
                  textTransform: "none",
                  fontWeight: isActive(m) ? 700 : 500,
                  borderBottom: isActive(m)
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

        {/* Nút nhóm */}
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

        {/* MENU mobile */}
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
                      selected={isActive(m)}
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
