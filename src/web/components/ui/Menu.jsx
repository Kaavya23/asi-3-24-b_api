// MenuComponents.js
import React from "react"
import Link from "@/web/components/ui/Link"

export const MenuItem = ({ children, href, ...otherProps }) => (
  <li {...otherProps}>
    <Link styless href={href}>
      {children}
    </Link>
  </li>
)

export const AdminMenu = () => (
  <>
    {/* Ajoutez ici les éléments du menu spécifiques à l'administrateur */}
    <MenuItem href="/admin/dashboard">Admin Dashboard</MenuItem>
    <MenuItem href="/admin/users">Manage Users</MenuItem>
  </>
)

export const UserMenu = () => (
  <>
    {/* Ajoutez ici les éléments du menu pour les utilisateurs non administrateurs */}
    <MenuItem href="/">List todos</MenuItem>
    <MenuItem href="/todos/create">Create todo</MenuItem>
    <MenuItem href="/posts/create">Create post</MenuItem>
    <MenuItem href="/categories">List posts</MenuItem>
    <MenuItem href="/profil">Profil</MenuItem>
  </>
)
