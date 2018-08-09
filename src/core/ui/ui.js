export const UI = {
  LazyLoading: {
    config: {
      rootMargin: '25px',
      threshold: 0.01,
    },
    observer: null,
    images: [],
    count: 0,
    init() {
      this.images = document.querySelectorAll('.lazy-loading-image');
      this.count = this.images.length;

      if (!('IntersectionObserver' in window))
        this.loadImagesImmediately();
      else {
        let reference = this;
        this.observer = new IntersectionObserver((entries) => {
          reference.onIntersection(entries);
        }, this.config);

        this.images.forEach((image)=>{
          if (!image.classList.contains('js-lazy-image--handled'))
            this.observer.observe(image);
        });
      }
    },
    disconnect() {
      if (!this.observer)
        return;

      this.observer.disconnect();
    },
    onIntersection(entries) {
      if (this.count === 0)
      this.disconnect();

      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          this.count--;

          // Stop watching and load the image
          this.observer.unobserve(entry.target);
          this.loadNode(entry.target);
        }
      });
    },
    loadImagesImmediately() {
      this.images.forEach((image)=>{
        this.loadNode(image);
      });
    },
    loadNode(element) {
      if (!element) return;

      if (element.tagName === 'IMG')
        this.loadImage(element);

      if (element.tagName === 'PICTURE')
        this.loadPicture(element);
    },
    loadImage(image) {
      let src = image.getAttribute('data-src');
      let srcset = image.getAttribute('data-srcset');

      if (!src && !srcset) return;

      if (srcset)
        image.setAttribute('srcset', srcset);
      if (src)
        image.src = src;

      image.classList.add('js-lazy-image--handled');
    },
    loadPicture(picture) {
      let children = picture.children;

      for (let child of children) {
        this.loadImage(child);
      };
    },
    // fetchImage(url) {
    //   return new Promise((resolve, reject) => {
    //     const image = new Image();
    //     image.src = url;
    //     image.onload = resolve;
    //     image.onerror = reject;
    //   });
    // },
    // applyImage(img, src) {
    //   // Prevent this from being lazy loaded a second time.
    //   img.classList.add('js-lazy-image--handled');
    //   img.src = src;
    //   img.classList.add('fade-in');
    // },
    // preloadImage(image) {
    //   const src = image.dataset.src;
    //   if (!src)
    //     return;

    //   return this.fetchImage(src).then(() => {
    //     this.applyImage(image, src);
    //   });
    // },
  },
};
