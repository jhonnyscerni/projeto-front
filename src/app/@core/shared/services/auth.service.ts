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
    apiURLRecuperarSenha: string = this.apiURL + '/resetpassword'
    apiURLRegistro: string = this.apiURL + '/authuser/signup'
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Save Token
     */
    public saveToken(token: any): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token.token);
    }
    /**
     * Get Token
     */
    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    /**
     * Sub
     */
    public getUserId(): any {
        const token = this.getToken();
        if (token) {
            return this.jwtHelper.decodeToken(token).sub;
        }
        return null;
    }

    /**
     * Iss
     */
    public getUserName(): any {
        const token = this.getToken();
        if (token) {
            return this.jwtHelper.decodeToken(token).iss;
        }
        return null;
    }

    /**
     * Authorities
     */
    public getAuthorities() {
        const token = this.getToken();
        if (token) {
            const autorizacoes = this.jwtHelper.decodeToken(token).authorities
            return autorizacoes;
        }
        return null;
    }

    /**
     * Verify if Authenticated
     */
    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (token) {
            const expired = this.jwtHelper.isTokenExpired(token)
            return !expired;
        }
        return false;
    }

    public signOut() {
        localStorage.removeItem(TOKEN_KEY)
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
