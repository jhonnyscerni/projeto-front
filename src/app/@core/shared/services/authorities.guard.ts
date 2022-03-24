import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';import { AuthService } from './auth.service';
;

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesGuard implements CanActivate {

  public namesAuthorities: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      let authorities = this.authService.getAutorizacoes();

      // Transformando o authorities em outra Lista so com os nomes
      for (var i of authorities) {
          this.namesAuthorities.push(i.authority)
      }

      let authorized: any = next.data[0];
      //console.log(authorized)

      if (authorized !== undefined) {
        if(!this.namesAuthorities){
          this.navegarAcessoNegado();
        }

        let userAuthorities = this.namesAuthorities.find(x => x === authorized);
                
        if(!userAuthorities){
            this.navegarAcessoNegado();
        }
       // console.log("userAuthorities" + userAuthorities)
      }

      return true
  }

  
  private navegarAcessoNegado() {
    this.router.navigate(['/painel/acesso-negado']);
}  
  
}