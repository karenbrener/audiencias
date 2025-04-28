
import React from 'react';

interface ContactosTagsProps {
  tags: string[];
}

const ContactosTags = ({ tags }: ContactosTagsProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 text-xs rounded-full bg-audience-lightPurple text-audience-purple"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ContactosTags;
