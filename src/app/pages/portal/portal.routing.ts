import { Routes } from "@angular/router";

import { ProfileComponent } from "./profile/profile.component";
import { TimelineComponent } from "./timeline/timeline.component";

export const portalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "minha-conta",
        component: ProfileComponent
      },
      {
        path: "timeline",
        component: TimelineComponent
      }
    ]
  }
];
