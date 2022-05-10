import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

var misc: any = {
    sidebar_mini_active: true
};

export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
    permissao?: string
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}

export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Análise Geral',
        type: 'link',
        icontype: 'ni-shop text-primary',
        permissao: 'CONSULTAR_DASHBOARD'
    },
    // {
    //   path: "/dashboard",
    //   title: "Configuração",
    //   type: "link",
    //   icontype: "ni-settings-gear-65 text-black"
    // },
    // {
    //   path: "/dashboard",
    //   title: "Ajuda",
    //   type: "link",
    //   icontype: "ni-chat-round text-primary"
    // },
    // {
    //   path: "/portal",
    //   title: "portal",
    //   type: "sub",
    //   icontype: "ni-ungroup text-orange",
    //   collapse: "portal",
    //   isCollapsed: true,
    //   children: [
    //     { path: "pricing", title: "Pricing", type: "link" },
    //     { path: "login", title: "Login", type: "link" },
    //     { path: "register", title: "Register", type: "link" },
    //     { path: "lock", title: "Lock", type: "link" },
    //     { path: "timeline", title: "Timeline", type: "link" },
    //     { path: "profile", title: "Profile", type: "link" }
    //   ]
    // },
    // {
    //   path: "/components",
    //   title: "Components",
    //   type: "sub",
    //   icontype: "ni-ui-04 text-info",
    //   collapse: "components",
    //   isCollapsed: true,
    //   children: [
    //     { path: "buttons", title: "Buttons", type: "link" },
    //     { path: "cards", title: "Cards", type: "link" },
    //     { path: "grid", title: "Grid", type: "link" },
    //     { path: "notifications", title: "Notifications", type: "link" },
    //     { path: "icons", title: "Icons", type: "link" },
    //     { path: "typography", title: "Typography", type: "link" },
    //     {
    //       path: "multilevel",
    //       isCollapsed: true,
    //       title: "Multilevel",
    //       type: "sub",
    //       collapse: "multilevel",
    //       children: [
    //         { title: "Third level menu" },
    //         { title: "Just another link" },
    //         { title: "One last link" }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   path: "/forms",
    //   title: "Forms",
    //   type: "sub",
    //   icontype: "ni-single-copy-04 text-pink",
    //   collapse: "forms",
    //   isCollapsed: true,
    //   children: [
    //     { path: "elements", title: "Elements", type: "link" },
    //     { path: "components", title: "Components", type: "link" },
    //     { path: "validation", title: "Validation", type: "link" }
    //   ]
    // },
    // {
    //   path: "/tables",
    //   title: "Tables",
    //   type: "sub",
    //   icontype: "ni-align-left-2 text-default",
    //   collapse: "tables",
    //   isCollapsed: true,
    //   children: [
    //     { path: "tables", title: "Tables", type: "link" },
    //     { path: "sortable", title: "Sortable", type: "link" },
    //     { path: "ngx-datatable", title: "Ngx Datatable", type: "link" }
    //   ]
    // },
    // {
    //   path: "/widgets",
    //   title: "Widgets",
    //   type: "link",
    //   icontype: "ni-archive-2 text-green"
    // },
    // {
    //   path: "/charts",
    //   title: "Charts",
    //   type: "link",
    //   icontype: "ni-chart-pie-35 text-info"
    // },
    {
        path: '/pessoas',
        title: 'Pessoas',
        type: "sub",
        icontype: 'ni-circle-08 text-green',
        permissao: 'SEG_CONSULTAR_PESSOAS',
        collapse: 'pessoas',
        isCollapsed: true,
        children: [
            {path: 'todas', title: 'Todas as Pessoas', type: 'link'},
            {path: 'meus-cadastros', title: 'Meus cadastros de Pessoas', type: 'link'},
        ]
    },
    {
        path: '/pessoas/meus-cadastros',
        title: 'Pessoas',
        type: 'link',
        icontype: 'ni-circle-08 text-green',
        permissao: 'SEG_CONSULTAR_PESSOAS'
    },
    {
        path: '/empresas',
        title: 'Empresas',
        type: 'sub',
        icontype: 'ni-building text-pink',
        permissao: 'SEG_CONSULTAR_EMPRESAS',
        collapse: 'empresas',
        isCollapsed: true,
        children: [
            {path: 'todas', title: 'Todas as Empresas', type: 'link'},
            {path: 'meus-cadastros', title: 'Minhas Empresas', type: 'link'},
        ]
    },
    {
        path: '/empresas/meus-cadastros',
        title: 'Empresas',
        type: 'link',
        icontype: 'ni-building text-pink',
        permissao: 'SEG_CONSULTAR_EMPRESAS'
    },
    {
        path: '/usuarios',
        title: 'Usuarios',
        type: 'sub',
        icontype: 'ni-single-02 text-info',
        permissao: 'SEG_CONSULTAR_USUARIOS',
        collapse: 'usuarios',
        isCollapsed: true,
        children: [
            {path: 'todos', title: 'Todos Usuarios', type: 'link'},
            {path: 'meus-cadastros', title: 'Meus Usuarios', type: 'link'},
        ]
    },
    {
        path: '/usuarios/meus-cadastros',
        title: 'Usuários',
        type: 'link',
        icontype: 'ni-single-02 text-info',
        permissao: 'SEG_CONSULTAR_USUARIOS'
    },
    {
        path: '/grupos',
        title: 'Grupos',
        type: 'link',
        icontype: 'ni-ungroup text-orange',
        permissao: 'SEG_CONSULTAR_GRUPOS'
    },
    {
        path: '/permissoes',
        title: 'Permissões',
        type: 'link',
        icontype: 'ni-settings-gear-65 text-black',
        permissao: 'SEG_CONSULTAR_PERMISSOES'
    }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public menuItemsPermissao: any[];
    public isCollapsed = true;
    public dadoAuthorities: any[] = [];

    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        let authorities = this.authService.getAutorizacoes();

        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.router.events.subscribe(event => {
            this.isCollapsed = true;
        });

        // Transformando o authorities em outra Lista so com os nomes
        for (var i of authorities) {
            this.dadoAuthorities.push(i.authority)
        }

        this.menuItemsPermissao = this.menuItems.filter(f => this.dadoAuthorities.includes(f.permissao));
    }

    onMouseEnterSidenav() {
        if (!document.body.classList.contains('g-sidenav-pinned')) {
            document.body.classList.add('g-sidenav-show');
        }
    }

    onMouseLeaveSidenav() {
        if (!document.body.classList.contains('g-sidenav-pinned')) {
            document.body.classList.remove('g-sidenav-show');
        }
    }

    minimizeSidebar() {
        const sidenavToggler = document.getElementsByClassName(
            'sidenav-toggler'
        )[0];
        const body = document.getElementsByTagName('body')[0];
        if (body.classList.contains('g-sidenav-pinned')) {
            misc.sidebar_mini_active = true;
        } else {
            misc.sidebar_mini_active = false;
        }
        if (misc.sidebar_mini_active === true) {
            body.classList.remove('g-sidenav-pinned');
            body.classList.add('g-sidenav-hidden');
            sidenavToggler.classList.remove('active');
            misc.sidebar_mini_active = false;
        } else {
            body.classList.add('g-sidenav-pinned');
            body.classList.remove('g-sidenav-hidden');
            sidenavToggler.classList.add('active');
            misc.sidebar_mini_active = true;
        }
    }
}
