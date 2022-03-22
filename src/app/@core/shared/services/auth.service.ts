import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Usuario} from 'src/app/models/usuario';
import {map, catchError} from 'rxjs/operators';
import {BaseService} from './base.service';
import {UsuarioRecuperarSenha} from 'src/app/models/dto/usuario-recuperar-senha';
import {UsuarioLogin} from "../../../models/dto/login";
import {Page} from "../../../models/page/page";

const TOKEN_KEY = 'token';
const USER_KEY = 'auth-user';
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {


    apiURL: string = environment.urlbase + "/auth"
    apiURLRecuperarSenha: string = this.apiURL + "/resetpassword"
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    public saveToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }

    obterToken() {
        const tokenString = localStorage.getItem(TOKEN_KEY)
        if (tokenString) {
            const token = JSON.parse(tokenString).access_token
            return token;
        }
        return null;
    }

    encerrarSessao() {
        localStorage.removeItem(TOKEN_KEY)
    }

    getUsuarioAutenticado() {
        const token = this.obterToken();
        if (token) {
            const usuario = this.jwtHelper.decodeToken(token).user_name
            return usuario;
        }
        return null;
    }

    getUsuarioIdAutenticado() {
        const token = this.obterToken();
        if (token) {
            const usuario = this.jwtHelper.decodeToken(token).usuario_id
            console.log(usuario)
            return usuario;
        }
        return null;
    }

    getAutorizacoes() {
        const token = this.obterToken();
        if (token) {
            const autorizacoes = this.jwtHelper.decodeToken(token).authorities
            //console.log("Autorizações: "+ autorizacoes)
            return autorizacoes;
        }
        return null;
    }


    isAuthenticated(): boolean {
        const token = this.obterToken();
        if (token) {
            const expired = this.jwtHelper.isTokenExpired(token)
            return !expired;
        }
        return false;
    }

    salvar(usuario: Usuario): Observable<any> {
        return this.http.post<any>(this.apiURL, usuario);
    }

    login(usuarioLogin: UsuarioLogin): Observable<any> {

        return this.http
            .post(this.apiURL + '/login',
                usuarioLogin, {headers})
            .pipe(
                catchError(super.serviceError));
    }

    recuperarLogin(record: UsuarioRecuperarSenha): Observable<UsuarioRecuperarSenha> {

        return this.http.get<any>(`${this.apiURLRecuperarSenha}/${record.email}`)
            .pipe(
                catchError(super.serviceError));
    }


}
