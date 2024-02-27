import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SEOServiceService {

  constructor(
    private title: Title, 
    private meta: Meta,
    @Inject(DOCUMENT) private doc: any) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ property: "og:title", content: title });
    this.meta.updateTag({ name: "twitter:title", content: title });
  }

  canonicalLink(link: string) {
    let linkTags: HTMLLinkElement[] = this.doc.getElementsByTagName('link');
    for(let linkTag of linkTags) {
      if(linkTag.rel === 'canonical') {
        linkTag.setAttribute('href', link);
        break;
      }
    }
  }

  updateDescription(descp: string) {
    this.meta.updateTag({ name: "description", content: descp });
    this.meta.updateTag({ property: "og:description", content: descp });
    this.meta.updateTag({ name: "twitter:description", content: descp });
  }

  socialMediaURL(link: string) {
    this.meta.updateTag({ property: "og:url", content: link });
  }

  socialMediaImageURL(link: string) {
    this.meta.updateTag({ property: "og:image", content: link });
    this.meta.updateTag({ name: "twitter:image", content: link });
  }


}
