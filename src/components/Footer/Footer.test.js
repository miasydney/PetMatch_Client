import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders the footer component", () => {

  // test footer renders with expected content
  render(<Footer />);
  const footerText = screen.getByText(
    (content, element) => {
      const hasText = (node) => node.textContent === content;
      const elementHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );
      return elementHasText && childrenDontHaveText;
    },
    { exact: false }
    
  );

  expect(footerText).toBeInTheDocument();
});
