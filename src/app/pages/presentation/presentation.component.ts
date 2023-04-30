import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/@core/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.scss"]
})
export class PresentationComponent implements OnInit {
  test: Date = new Date();
  isCollapsed = true;
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  usuarioLogado(): boolean {
    this.user = this.authService.getUserName()
    return this.authService.isAuthenticated()
  }

  logout() {
    this.authService.signOut()
    this.router.navigate(['/home'])
  }
}



