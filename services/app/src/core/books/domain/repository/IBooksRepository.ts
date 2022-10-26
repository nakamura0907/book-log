import { GeneratedId } from "@/core/shared/Id";
import Book from "../model/Book";
import Dashboard from "../model/Dashboard";
import FetchOptions from "../model/FetchOptions";

interface IBooksRepository {
  fetchDashboard(): Promise<Dashboard>;
  save(book: Book): Promise<Book>;
  fetchBookList(options: FetchOptions): Promise<Book[]>;
  fetchById(id: GeneratedId): Promise<Book | undefined>;
  removeBook(id: GeneratedId): Promise<void>;
}

export default IBooksRepository;
