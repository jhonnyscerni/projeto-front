import { Routes } from "@angular/router";

import { GoogleComponent } from "./google/google.component";

export const MapsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "google",
        component: GoogleComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "vector",
        component: GoogleComponent
      }
    ]
  }
];
