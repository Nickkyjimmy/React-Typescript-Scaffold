import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  type PaginationDemoProp = {
    maxPage: number;
    indexPage: number;
    setIndexPage: (indexPage: number) => void;
}
  
  export function PaginationDemo({
    maxPage,
    indexPage,
    setIndexPage
  }: PaginationDemoProp) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => setIndexPage(Math.max(0, indexPage - 1))} />
          </PaginationItem>
            {Array.from({ length: maxPage }, (_, i) => (
              <PaginationItem key={i} onClick={() => setIndexPage(i)} >
                <PaginationLink href="#" isActive={i === indexPage}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext href="#" onClick={() => setIndexPage(Math.min(maxPage - 1, indexPage + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  