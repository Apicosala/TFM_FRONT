import { ActivatedRoute, CanActivateChildFn, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/decodedToken.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const isUserCorrectGuard: CanActivateFn = (childRoute, state) => {
    let router = inject(Router);
    let route = inject(ActivatedRoute);

    // Obtener el token del almacenamiento local
    const token: string | null = localStorage.getItem('auth_token');

    if (token === null) {
        // No hay token, redirigir a la página de inicio de sesión
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Debes autentificarte para intentar acceder a esta ruta',
            confirmButtonText: 'OK'
        })
        router.navigate(['/auth', 'login']);
        return false;
    }

    try {
        const tokenDecode: DecodedToken = jwtDecode(token);
        const tokenId = tokenDecode.user_id;

        // Comprobación de nulidad antes de acceder a route.snapshot
        const usuarioIdFromRoute = +!route.snapshot.paramMap.get('usuarioId');
        
        if (tokenId === usuarioIdFromRoute) {
            return true; // Se permite el acceso
        } else {
            // Redirigir a la página principal
            Swal.fire({
                icon: 'error',
                title: 'Acceso denegado',
                text: 'No tienes permitido acceder a esta ruta.',
                confirmButtonText: 'OK'
            })
            router.navigate(['/home']);
            return false;
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al decodificar el token.',
            confirmButtonText: 'OK'
        });
        // Manejar el error de decodificación del token
        router.navigate(['/home']);
        return false;
    }
}





