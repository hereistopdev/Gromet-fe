import React from 'react'
import {ClockCircleOutlined} from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
function BlogPost({image, title, category, author, date, readTime, content, href, isSmall} 
    :{
        image :string,
        title :string,
        category :string,
        author :string,
        date :string,
        readTime :string,
        content? :string,
        href? :string,
        isSmall? :boolean,
    }) {
  return (
    <div className="post-card">
            <div className={!isSmall ? "post-card__image" : "blogIsSmallImage"} ><a href={href ? href : "/blog" }><LazyLoadImage effect="blur" src={image}  alt=""/></a></div>
            <div className="post-card__info">
                <div className="blogpost-category">{category}</div>
                <div className="blogpostPostName post-card__name"><a className='atagBlogTitle' href={href ? href : "/blog" }>{title}</a></div>
                <div className="post-card__content">{content && content?.length > 150 ? content?.substring(0,150)+"..." : content}</div>
                <div className="post-card__read-more"><a href={href ? href : "/blog" } className="btn btn-secondary btn-sm">Read More</a></div>
                <div className="blogpost-bottomLabel">{author} {author?.length > 2 ? ',': ''} {date} | <ClockCircleOutlined style={{marginLeft: "8px", paddingLeft:"5px"}}></ClockCircleOutlined><label style={{marginLeft: "5px"}}>{readTime}</label></div>
            </div>
    </div>
  )
}

export default BlogPost