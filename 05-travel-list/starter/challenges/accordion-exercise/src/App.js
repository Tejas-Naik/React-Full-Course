import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setIsCurOpen] = useState(null);

  return <div className="accordion">
    {
      data.map(({ text, title }, i) =>
        <AccordionItem
          key={i}
          title={title}
          num={i}
          curOpen={curOpen}
          onOpen={setIsCurOpen}
        >
          <div className="content-box">{text}</div>
        </AccordionItem>)
    }
    <AccordionItem
      key={1235}
      title="React"
      num={23}
      curOpen={curOpen}
      onOpen={setIsCurOpen}
    >
      <div className="content-box">Learn react in 2023. thats the best decicsion you can make.</div>
    </AccordionItem>
  </div>;
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  // const [isOpen, setIsOpen] = useState(false);
  const isOpen = num === curOpen;

  const handleToggle = function () {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? '-' : "+"}</p>

      {isOpen && children}

    </div>
  )
}