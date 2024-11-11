// /src/app/components/NavBar.tsx
"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { Button, TextField, InputAdornment } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import IconButton from "@mui/material/IconButton";
import { useModal } from "../contexts/ModalContext";
import ProfileModal from "./modals/ProfileModal"; // Updated import path
import MenuModal from "./modals/MenuModal"; // Updated import path

interface NavBarProps {
  session: Session | null;
}

export default function NavBar({ session }: NavBarProps) {
  const { openModal } = useModal();

  const handleMenuClick = () => {
    openModal("menu");
  };

  const handleProfileClick = () => {
    openModal("profile");
  };

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full h-[10vh] bg-navbargrey z-50 px-6">
      <div className="flex items-center">
        <Image
          src="/images/check.png"
          alt="Nud Icon"
          width={50}
          height={50}
          className="mr-2"
        />
        <div className="text-4xl font-bold text-tinderpink pl-2">Nud</div>
      </div>

      <div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF5864",
            fontWeight: "bold",
            padding: "8px 70px",
            fontSize: "1.2rem",
            borderRadius: "50px",
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "#FF5864",
            },
          }}
          onClick={handleMenuClick} // Open MenuModal on click
        >
          Menu
        </Button>
      </div>

      <div className="flex items-center">
        <TextField
          variant="standard"
          placeholder="Search for activities..."
          sx={{
            padding: "8px 20px",
            backgroundColor: "#D9D9D9",
            borderRadius: "50px",
            width: "800px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchRounded sx={{ color: "#4A4A4A" }} />
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
            sx: {
              "& .MuiInput-underline:before": { borderBottomColor: "transparent" },
              "& .MuiInput-underline:hover:before": { borderBottomColor: "transparent" },
              "& .MuiInputBase-input::placeholder": { color: "#4A4A4A", fontSize: "1.2rem", opacity: 1 },
            },
          }}
        />
      </div>

      <div className="flex items-center">
        <div className="text-2xl font-bold text-white pr-6">
          {session ? session.user?.name : "Guest"}
        </div>
        <Image
          src="/images/user.png"
          alt="User Icon"
          width={50}
          height={50}
          className="rounded-full cursor-pointer"
          onClick={handleProfileClick} // Trigger the ProfileModal on click
        />
      </div>

      <ProfileModal session={session} /> {/* Render the ProfileModal */}
      <MenuModal /> {/* Render the MenuModal */}
    </div>
  );
}