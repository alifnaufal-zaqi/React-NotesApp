import React, { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import NotesList from "./pages/NotesList";
import NotesDetail from "./pages/NotesDetail";
import Page404 from "./pages/Page404";
import ArchiveNotesPage from "./pages/ArchiveNotesPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./component/Footer";
import LoginPage from "./pages/LoginPage";
import {
  addNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  getUserLogged,
  putAccessToken,
  archiveNote,
  unarchiveNote,
} from "./utils/api";
import ThemeContext from "./contexts/ThemeContext";

const App = () => {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const navigate = useNavigate();
  const location = useLocation();

  const filteredActiveNotes = activeNotes.filter((note) => {
    return (
      typeof keyword === "string" &&
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  const filteresArchiveNotes = archiveNotes.filter((note) => {
    return (
      typeof keyword === "string" &&
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  const toggleTheme = () => {
    const theme = !isChecked;

    setIsChecked(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme !== null) {
      setIsChecked(savedTheme === "true");
    }
  }, []);

  const themeContextValue = useMemo(() => {
    return {
      isChecked,
      toggleTheme,
    };
  }, [isChecked]);

  const fetcActiveNotes = async () => {
    try {
      const { data } = await getActiveNotes();

      if (location.pathname === "/login" || location.pathname === "/register") {
        setActiveNotes(data || []);
      } else {
        setActiveNotes(data);
      }
    } catch (error) {
      console.error(error);
      setActiveNotes([]);
    }
  };

  const fetchArchiveNotes = async () => {
    try {
      const { data } = await getArchivedNotes();

      if (location.pathname === "/login" || location.pathname === "/register") {
        setArchiveNotes(data || []);
      } else {
        setArchiveNotes(data);
      }
    } catch (error) {
      console.error(error);
      setArchiveNotes([]);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
      }
      setInitializing(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    fetcActiveNotes();
    fetchArchiveNotes();
  }, [location.pathname]);

  useEffect(() => {
    document
      .getElementById("root")
      .setAttribute("class", `${!isChecked ? "bg-slate-200" : "bg-gray"}`);
  }, [isChecked]);

  const handleArchiveNotes = async (updateNotes) => {
    await archiveNote(updateNotes);

    fetchArchiveNotes();
    fetcActiveNotes();
  };

  const handleActiveNotes = async (updateNotes) => {
    await unarchiveNote(updateNotes);

    fetchArchiveNotes();
    fetcActiveNotes();
  };

  const handleAddNotes = async (newNote) => {
    setIsLoading(true);
    await addNote(newNote);
    setIsLoading(false);

    fetcActiveNotes();
  };

  const handleDeleteNotes = async (id) => {
    await deleteNote(id);

    fetcActiveNotes();
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);

    setIsLoading(true);
    const { data } = await getUserLogged();
    setIsLoading(false);

    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <header
          className={`flex justify-around py-5 ${
            isChecked ? "bg-gray-700" : "bg-slate-300"
          } content-center`}
        >
          <h1
            className={`text-4xl font-extrabold font-title align-middle ${
              isChecked ? "text-slate-200" : "text-black"
            }`}
          >
            NOTES APP
          </h1>
        </header>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage loginSuccess={onLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer name="Alif Naufal Zaqi" />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Routes>
        <Route
          path="/notes"
          element={
            <NotesList
              notes={filteredActiveNotes}
              onUpdateNote={handleArchiveNotes}
              onDeleteNote={handleDeleteNotes}
              onAddNote={handleAddNotes}
              keywordChange={handleSearch}
              keyword={keyword}
              logout={onLogout}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/notes/:id"
          element={
            <NotesDetail
              notes={activeNotes}
              keywordChange={handleSearch}
              keyword={keyword}
              logout={onLogout}
            />
          }
        />
        <Route
          path="/notes/archive"
          element={
            <ArchiveNotesPage
              notes={filteresArchiveNotes}
              onActiveNotes={handleActiveNotes}
              onDeleteNote={handleDeleteNotes}
              keywordChange={handleSearch}
              keyword={keyword}
              logout={onLogout}
            />
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ThemeContext.Provider>
  );
};

export default App;
