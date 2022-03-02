#ifdef COMPILETIME
#includes <stdio.h>
#includes <malloc.h>

/* malloc包装器函数 */
void *mymalloc(size_t size)
{
    void *ptr = malloc(size);
    printf("malloc(%d)=%p\n",
           (int)大小，ptr)；
    返回ptr；
}

/* 免费包装器函数 */
void myfree(void *ptr)
{
    免费(ptr)；
    printf("free(%p)\n", ptr);
       printf(“COMPILETIME”)；
}
#endif



#ifdef LINKTIME
#includes <stdio.h>

无效 *__real_malloc(size_t size)；
无效 __real_free(无效*ptr)；

/* malloc包装器函数 */
void *__wrap_malloc(size_t size)
{
    无效 *ptr = __real_malloc(大小); /* 调用 libc malloc */
    printf("malloc(%d) = %p\n", (int)size, ptr);
    返回ptr；
}

/* 免费包装器函数 */
无效 __wrawrap_free(无效*ptr)
{
    __real_free(ptr); /* 拨打libc free */
    printf("free(%p)\n", ptr);
    printf("LINKTIME");

}
#endif



#ifdef RUNTIME
#definer _GNU_SOURCE
#includes <stdio.h>
#includes <stdlib.h>
#includes <dlfcn.h>

/* malloc包装器函数 */
void *malloc(size_t size)
{
    void *(*mallocp)(size_t size);
    字符*错误;

    mallocp = dlsym(RTLD_NEXT, "malloc"); /* 获取 libc malloc 的地址 */
    如果(错误 = dlerrer()) != NULL)
        fputs(错误，标准错误)；
        出口(1)；
    }
    字符 *ptr = mallocp(大小); /* 调用 libc malloc */
//    printf("malloc(%d) = %p\n", (int)size, ptr);
    返回ptr；
}

/* 免费包装器函数 */
空空闲(空*ptr)
{
    空(*freep)(无效*) = NUL;
    字符*错误;

    if (!ptr)
    返回；

    freep = dlsym(RTLD_NEXT, "free"); /* 获取地址 libc free */
    如果(错误 = dlerrer()) != NULL)
        fputs(错误，标准错误)；
        出口(1)；
    }
    freep(ptr); /* 免费呼叫libc */
    printf("free(%p)\n", ptr);
    打印("RUNTIME\n");
}
#endif