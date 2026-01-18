<template>
    <div class="mt-8 flex relative lg:mt-0 lg:pl-1.5 lg:pt-0 lg:pr-4 lg:pb-16">
        <div
            class="lg:content-[''] lg:absolute lg:left-0 lg:bottom-[calc(50%+25px)] lg:h-[calc(50%-25px)] lg:border-l lg:border-border"
        ></div>
        <i
            class="flex place-items-center place-content-center w-8 h-8 text-primary-light lg:block lg:absolute lg:top-[calc(50%-25px)] lg:left-6 lg:w-12 lg:h-12 lg:rounded-lg lg:border lg:border-border lg:bg-[var(--color-background)"
        >
            <slot name="icon"></slot>
        </i>
        <div class="flex-1 ml-4">
            <h3 class="text-xl font-semibold mb-2 text-primary-light">
                <slot name="heading"></slot>
            </h3>
            <slot></slot>
        </div>
        <div
            class="lg:content-[''] lg:absolute lg:left-0 lg:top-[calc(50%+25px)] lg:h-[calc(50%-25px)] lg:border-l lg:border-border lg:last:hidden"
        ></div>
    </div>
</template>