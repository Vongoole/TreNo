import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./app/theme";
import Posts from "./features/pages/posts/Posts";
import Logo from "./features/logo/Logo";
import Login from "./features/pages/logout/Login";
import {useDispatch, useSelector} from "react-redux";
import Logout from "./features/pages/logout/Logout";
import {checkSession} from "./features/pages/logout/UserSlice";
import {fetchAllPosts} from "./features/pages/posts/PostsSlice";
import LoadingIndicator from "./features/loadingIndicator/LoadingIndicator";

const customTheme = createTheme(theme)

function App() {

    const dispatch = useDispatch()
    const session = useSelector(state => state.user.session)

    dispatch(fetchAllPosts())

    if (!session) dispatch(checkSession())

    return (
        <ThemeProvider theme={customTheme}>
            <Container maxWidth={"xl"}>
                <CssBaseline/>
                <LoadingIndicator/>
                <Logo/>
                {session ? <Logout/> : <Login/>}
                <Posts canAddNew={!!session}/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
