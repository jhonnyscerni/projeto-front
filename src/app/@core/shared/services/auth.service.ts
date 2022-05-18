import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from 'src/app/models/user';
import {map, catchError} from 'rxjs/operators';
import {BaseService} from './base.service';
import {UsuarioRecuperarSenha} from 'src/app/models/dto/usuario-recuperar-senha';
import {UsuarioLogin} from '../../../models/dto/login';
import {Page} from '../../../models/page/page';
import {Person} from '../../../models/person';

const TOKEN_KEY = 'token';
const USER_KEY = 'auth-user';
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {


    apiURL: string = environment.urlbase + '/authuser/auth'
    apiURLRecuperarSenha: string = this.apiURL + '/authuser/resetpassword'
    apiURLRegistro: string = this.apiURL + '/authuser/signup'
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    public saveToken(token: any): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token.token);
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
            // const token = JSON.parse(tokenString)
            const token = tokenString
            return token;
        }
        return null;
    }

    public encerrarSessao() {
        localStorage.removeItem(TOKEN_KEY)
    }

    public getUsuarioAutenticado() {
        const token = this.obterToken();
        if (token) {
            const usuario = this.jwtHelper.decodeToken(token).sub
            return usuario;
        }
        return null;
    }

    getUsuarioIdAutenticado() {
        const token = this.obterToken();
        if (token) {
            const usuario = this.jwtHelper.decodeToken(token).sub
            console.log(usuario)
            return usuario;
        }
        return null;
    }

    public getAutorizacoes() {
        const token = this.obterToken();
        if (token) {
            const autorizacoes = this.jwtHelper.decodeToken(token).authorities
            return autorizacoes;
        }
        return null;
    }


    public isAuthenticated(): boolean {
        const token = this.obterToken();
        if (token) {
            const expired = this.jwtHelper.isTokenExpired(token)
            return !expired;
        }
        return false;
    }

    public salvar(usuario: User): Observable<any> {
        return this.http.post<any>(this.apiURL, usuario);
    }

    public login(usuarioLogin: UsuarioLogin): Observable<any> {

        return this.http
            .post(this.apiURL + '/login',
                usuarioLogin, {headers})
            .pipe(
                catchError(super.serviceError));
    }

    saveUserCommon(record: User) {
        return this.createUserCommon(record);
    }


    private createUserCommon(record: User): Observable<User> {
        return this.http
            .post(this.apiURLRegistro, record)
            .pipe(
                catchError(super.serviceError));
    }

    public recuperarLogin(record: UsuarioRecuperarSenha): Observable<UsuarioRecuperarSenha> {

        return this.http.get<any>(`${this.apiURLRecuperarSenha}/${record.email}`)
            .pipe(
                catchError(super.serviceError));
    }

    public savarComPadrinho(person: Person, id: any): Observable<any> {
        console.log(person)
        return this.http
            .post(this.apiURL + '/persongoldfather/' + id,
                person, {headers})
            .pipe(
                catchError(super.serviceError));
    }

}
