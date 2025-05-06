
import React from 'react';

interface ContactosTagsProps {
  tags: string[];
}

const ContactosTags = ({ tags }: ContactosTagsProps) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-1.5 py-0.5 text-xs rounded-full bg-audience-lightPurple text-audience-purple"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ContactosTags;
