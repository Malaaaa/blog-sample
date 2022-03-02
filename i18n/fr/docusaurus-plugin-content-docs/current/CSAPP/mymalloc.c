#ifdef COMPILETIME
#inclure <stdio.h>
#inclure <malloc.h>

/* fonction wrapper malloc */
void *mymalloc(size_t size)
{
    void *ptr = malloc(taille);
    printf("malloc(%d)=%p\n",
           (int)taille, ptr);
    retour ptr ;
}

/* fonction wrapper gratuite */
annuler myfree(annuler *ptr)
{
    gratuit(ptr);
    printf("libre(%p)\n", ptr);
       printf("TEMPS DE COMPILATION");
}
#fin si



#ifdef LINKTIME
#inclure <stdio.h>

void *__real_malloc(size_t size);
void __real_free(void *ptr);

/* fonction wrapper malloc */
void *__wrap_malloc(size_t size)
{
    vide *ptr = __real_malloc(taille); /* Appelle libc malloc */
    printf("malloc(%d) = %p\n", (int)taille, ptr);
    retour ptr ;
}

/* fonction wrapper gratuite */
void __wrap_free(void *ptr)
{
    __real_free(ptr); /* Appeler libc gratuitement */
    printf("libre(%p)\n", ptr);
    printf("HEURE DU LIEN");

}
#fin si



#ifdef DURÉE D'EXÉCUTION
#define _GNU_SOURCE
#inclure <stdio.h>
#inclure <stdlib.h>
#inclure <dlfcn.h>

/* fonction wrapper malloc */
void *malloc(size_t size)
{
    void *(*mallocp)(taille_t taille);
    caractère *erreur ;

    mallocp = dlsym(RTLD_NEXT, "malloc"); /* Obtenir l'adresse de libc malloc */
    if ((error = dlerror()) != NULL) {
        fputs (erreur, stderr);
        sortie(1);
    }
    char *ptr = mallocp(taille); /* Appelle libc malloc */
// printf("malloc(%d) = %p\n", (int)taille, ptr);
    retour ptr ;
}

/* fonction wrapper gratuite */
annuler gratuitement (annuler *ptr)
{
    void (*freep)(void *) = NULL ;
    caractère *erreur ;

    si (!ptr)
    retourner;

    freep = dlsym(RTLD_NEXT, "libre"); /* Récupère l'adresse de la libc gratuitement */
    if ((error = dlerror()) != NULL) {
        fputs (erreur, stderr);
        sortie(1);
    }
    librep(ptr); /* Appeler libc gratuitement */
    printf("libre(%p)\n", ptr);
    printf("RUNTIME\n");
}
#fin si