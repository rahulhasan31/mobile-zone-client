import React from 'react';
import BlogCard from './BlogCard';


const Blog = () => {

    const blogs = [
        {
            id: 1,
            img: "https://miro.medium.com/max/1400/1*L6VRj89-jxhxDp6NDOmYrA.png",
            question: "What are the different ways to manage a state in a React application?",
            ans: "State represents the value of a dynamic properties of a React component at a given instance. React provides a dynamic data store for each component. The internal data represents the state of a React component and can be accessed using this. state member variable of the component"
        },
        {
            id: 2,
            img: "https://www.cronj.com/blog/wp-content/uploads/inheritance.png",
            question: "How does prototypical inheritance work?",
            ans: "The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object."
        },
        {
            id: 3,
            img: "https://www.softwaretestinghelp.com/wp-content/qa/uploads/2012/11/Unit-Testing.png",
            question: "What is a unit test? Why should we write unit tests?",
            ans: "The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages"
        },
        {
            id: 4,
            img: "https://res.cloudinary.com/practicaldev/image/fetch/s--WKNaK3du--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k34n580fjmhbil513xo6.png ",
            question: "React vs. Angular vs. Vue?",
            ans: "Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option"
        },



    ]



    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 mt-20 p-10 gap-10'>
            {
                blogs.map(blog => <BlogCard blog={blog} key={blog.id}></BlogCard>)
            }
        </div>
    );
};

export default Blog;