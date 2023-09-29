import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Dashboard from "../Dashboard/Dashboard";
import Income from "../Income/Income";
import Expenses from "../Expenses/Expenses";
import IncomeDashboard from "../../Income/IncomeDashboard";
import ExpenseDashboard from "../../Expense/ExpenseDashboard";

const Layout = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderSelectedComponent = () => {
    if (selectedTab === "dashboard") {
      return <Dashboard />;
    } else if (selectedTab === "income") {
      return <IncomeDashboard/>
    } else if (selectedTab === "expenses") {
      return <ExpenseDashboard/>
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {showNavBar && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#000000",
            },
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#FFFFFF",
                marginLeft: "16px",
              }}
            >
              Pyra Fin
            </Typography>
          </Toolbar>
          <List>
            <Divider />
            {/* Dashboard */}
            <ListItem
              button
              key="dashboard"
              onClick={() => handleTabClick("dashboard")}
              sx={{
                "&:hover": {
                  backgroundColor: "#333", // Change the background color on hover
                },
              }}
            >
              <ListItemIcon>
                <DashboardIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" style={{ color: "#FBC91B" }} />
            </ListItem>
            {/* Income */}
            <ListItem
              button
              key="income"
              onClick={() => handleTabClick("income")}
              sx={{
                "&:hover": {
                  backgroundColor: "#333", // Change the background color on hover
                },
              }}
            >
              <ListItemIcon>
                <MonetizationOnIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="Income" style={{ color: "#FBC91B" }} />
            </ListItem>
            {/* Expenses */}
            <ListItem
              button
              key="expenses"
              onClick={() => handleTabClick("expenses")}
              sx={{
                "&:hover": {
                  backgroundColor: "#333", // Change the background color on hover
                },
              }}
            >
              <ListItemIcon>
                <AccountBalanceWalletIcon style={{ color: "#FBC91B" }} />
              </ListItemIcon>
              <ListItemText primary="Expenses" style={{ color: "#FBC91B" }} />
            </ListItem>
          </List>
        </Drawer>
      )}
      <div style={{ flex: 1, background: "#dedede",height:"100vh" }}>
        {renderSelectedComponent()}
      </div>
    </div>
  );
};

export default Layout;
