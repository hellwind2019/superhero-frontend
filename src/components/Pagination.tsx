import { Button } from "./ui/button";
interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (index: number) => void;
}
const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  return (
    <div className="flex gap-2 my-4 w-full mx-auto">
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
