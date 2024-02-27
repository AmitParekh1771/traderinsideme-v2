
export class BlogList {
    contentTitle: string;
    description: string;
    route: string;
    author: {
        _id:string,
        name: string,
        image: string,
        about: string,
        socialMedia: {
            linkedin: string,
            facebook: string,
            instagram: string,
            twitter: string
        }
    };
    categories: string[];
    tags: string[];
    publishingDate: string;
    _id: string;
    isPublished: boolean;
    constructor() {
        this.contentTitle = "";
        this.description = "";
        this.route = "";
        this.author = {
            _id :"",
            name : "",
            image : "",
            about : "",
            socialMedia : {
                linkedin : "",
                facebook : "",
                instagram : "",
                twitter : ""
            }
        },
        this.categories = [];
        this.tags = [];
        this.publishingDate = "";
        this._id = "";
        this.isPublished = true;
    }
}
