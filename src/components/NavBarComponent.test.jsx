import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect, vi, describe, it } from "vitest";
import NavBar from "./NavBarComponent";

// Mock the style module
vi.mock('./styles/NavBar.module.css', () => ({
  default: {
    navbar: 'navbar',
    navbarContainer: 'navbarContainer',
    navbarLogo: 'navbarLogo',
    navbarToggle: 'navbarToggle',
    navbarMenu: 'navbarMenu',
    navbarMenuOpen: 'navbarMenuOpen',
    navbarMenuClosed: 'navbarMenuClosed',
    navbarItem: 'navbarItem',
    navbarItemActive: 'navbarItemActive',
    navbarItemDisnabled: 'navbarItemDisnabled',
    navbarButton: 'navbarButton',
  }
}));

describe("NavBar Component", () => {
  const mockToggleForm = vi.fn();

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it("renders the NavBar component", () => {
    renderWithRouter(
      <NavBar toggleForm={mockToggleForm} formOpen={false} />,
      { route: '/overview' }
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("+ New")).toBeInTheDocument();
  });

  it("toggles the menu on button click", () => {
    renderWithRouter(
      <NavBar toggleForm={mockToggleForm} formOpen={false} />,
      { route: '/overview' }
    );
  
    const toggleButton = screen.getByTestId('menu-toggle');
    fireEvent.click(toggleButton);
  
    // Check if the menu opens
    expect(screen.getByTestId('menu-toggle')).toHaveAttribute('aria-expanded', 'true');
  });
  
  it("highlights the active link", () => {
    renderWithRouter(
      <NavBar toggleForm={mockToggleForm} formOpen={false} />,
      { route: '/contacts' }
    );
  
    expect(screen.getByText("Contacts")).toHaveClass('navbarItemActive');
  });
  

  it("calls toggleForm on button click", () => {
    renderWithRouter(
      <NavBar toggleForm={mockToggleForm} formOpen={false} />,
      { route: '/overview' }
    );

    fireEvent.click(screen.getByText("+ New"));
    expect(mockToggleForm).toHaveBeenCalled();
  });
});
