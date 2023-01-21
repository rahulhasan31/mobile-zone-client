import React from 'react';

const BlogCard = ({ blog }) => {
    const { question, ans, img } = blog
    return (
        <div className="card w-96 p-2 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{question}</h2>
                <p>{ans}</p>

            </div>
        </div>
    );
};

export default BlogCard;