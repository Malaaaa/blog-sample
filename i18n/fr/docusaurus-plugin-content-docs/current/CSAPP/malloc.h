 
#define malloc(taille) mymalloc(taille)
#define free(ptr) myfree(ptr)

void *mymalloc(taille_t taille);
void myfree(void *ptr);
