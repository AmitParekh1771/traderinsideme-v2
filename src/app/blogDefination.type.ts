
export class Blog {
    title: string;
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
    canonicalURL: string;
    content: string;
    tags: string[];
    categories: string[];
    isPublished: Boolean;
    modifyingDate: string;
    publishingDate: string;
    image: string;
    _id: string;
    constructor() {
        this.title = "Sample Title of Blog | TraderInsideMe";
        this.contentTitle = "This is Sample Title of the Blog";
        this.description = "Write your Blog Description here";
        this.route = "no-where";
        this.author = {
            _id :"617148c02c4f8c253bea4675",
            name : "Amit Parekh",
            image : "https://res.cloudinary.com/traderinsideme/image/upload/v1636712536/traderinsideme/kgr4mc4fq9jhtykfiiwk.jpg",
            about : "Hi! I’m Amit. I’m from Gujarat, India. I’m a CSE(Computer Science and Engineering) student at Sardar Vallabhbhai National Institute of Technology. I have been practicing Price Action trading for about one year. I’m also proficient in Full Stack Development(currently working on the MEAN stack). This blog is developed by me on the MEAN stack itself. My hobbies are reading books, photoshop, and chess.",
            socialMedia : {
                linkedin : "https://www.linkedin.com/in/amit-parekh-b52885222/",
                facebook : "https://www.facebook.com/profile.php?id=100073601979963",
                instagram : "https://www.instagram.com/amit_p1771/",
                twitter : "https://twitter.com/AmitP1771"
            }
        },
        this.canonicalURL = "https://traderinsideme.com/blog/no-where";
        this.content = `
<div class="quote-box m-t-0 flex col a-fe">
    <div class="quote _18 _700 text-dark italic text-center">
        In rem similique expedita quas beatae. Dicta aut saepe laborum cum quod quo eius, aspernatur, repellat magni ad nisi corporis quos inventore quasi, asperiores dolorum nemo non nesciunt voluptas perferendis odit quidem voluptate rem ducimus.
    </div>
    <div class="quote-author _16 text-light">Bill Gates</div>
</div>

<div class="container border fill" style="margin:30px 0px">
	<strong class="_20">Page Content</strong>
	<div class="ordered-list">
		<ol>
			<li><a href="blog/blog-route#section1" style="color:#222;text-decoration:none;">Section 1</a></li>
			<li><a href="blog/blog-route#section2" style="color:#222;text-decoration:none;">Section 2</a></li>
			<li><a href="blog/blog-route#section3" style="color:#222;text-decoration:none;">Section 3</a></li>
			<li><a href="blog/blog-route#section4" style="color:#222;text-decoration:none;">Section 4</a></li>
			<li><a href="blog/blog-route#section5" style="color:#222;text-decoration:none;">Section 5</a></li>
		</ol>
	</div>
</div>

<h2>Lorem ipsum dolor sit amet.</h2>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sequi harum quia, itaque praesentium enim eos sit odit nulla atque nemo distinctio quidem ipsam aliquam dicta aut inventore dolorum quos <a href="#" target="_blank">molestias</a> et  adipisci velit asperiores doloremque. </p>


<h3>Lorem ipsum dolor sit amet consectetur.</h3>

<p>In rem similique expedita quas beatae. Dicta aut saepe laborum cum quod quo eius, aspernatur, repellat magni ad nisi corporis quos inventore quasi, asperiores dolorum nemo non nesciunt voluptas perferendis odit quidem voluptate rem ducimus. Cum, a impedit quis dignissimos assumenda repellendus aliquam ratione minus ab laudantium harum voluptatem est ex recusandae unde iste odit, tempore consectetur. Accusamus natus praesentium adipisci quaerat facere?</p>


<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sint sunt officia, adipisci neque ipsa esse rem sequi atque alias suscipit. Sit consequatur ad id exercitationem maiores totam quam assumenda atque dignissimos accusantium, laboriosam voluptate explicabo molestias necessitatibus aliquam blanditiis, repellat mollitia! Sit in facere tempore ullam consequatur harum aspernatur?</p>

<div class="image-box flex col j-c a-c">
    <img class="block-image" src="https://res.cloudinary.com/traderinsideme/image/upload/v1636830385/traderinsideme/kkdgysswkm7lko9yw3vj.jpg">
</div>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio placeat blanditiis eum debitis laboriosam maiores necessitatibus aliquam perspiciatis rerum, consequatur reiciendis ut! Minus reiciendis reprehenderit ipsa eligendi. Molestiae, distinctio repellat!</p>

<div class="unordered-list">
    <ul>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, veritatis.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolor?</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, culpa.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla ratione repudiandae architecto corrupti voluptate expedita minima asperiores doloribus ipsum.</li>
    </ul>
</div>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sequi quisquam unde amet, eius facilis animi totam recusandae delectus rem iure enim quasi dolor quae. Quibusdam dolorem itaque molestias aut?</p>

<div class="ordered-list">
    <ol>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, veritatis.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolor?</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, culpa.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nulla ratione repudiandae architecto corrupti voluptate expedita minima asperiores doloribus ipsum.</li>
    </ol>
</div>

<div class="note">
    <span class="_700">Note: </span>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt id ipsum fuga illo in, amet odio aut rerum quia reiciendis?
</div>

<div class="table flex j-c">
    <table>
        <tr>
            <th>Lorem ipsum dolor sit.</th>
            <th>ipsum</th>
            <th>dolor</th>
            <th>sit</th>
        </tr>
        <tr>
            <td>lorem</td>
            <td>ipsum</td>
            <td>dolor</td>
            <td>sit</td>
        </tr>
        <tr>
            <td>lorem</td>
            <td>ipsum</td>
            <td>dolor</td>
            <td>sit</td>
        </tr>
        <tr>
            <td>lorem</td>
            <td>ipsum</td>
            <td>dolor</td>
            <td>sit</td>
        </tr>
    </table>
</div>
        `;
        this.tags = ["no", "where"];
        this.categories = ["Sample Blog"];
        this.isPublished = false;
        this.modifyingDate = "Oct 22, 2021";
        this.publishingDate = "Oct 22, 2021";
        this.image = "...featured image url...";
        this._id = "";
    }
}
