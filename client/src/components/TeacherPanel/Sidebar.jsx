import {useNavigate} from "react-router-dom";
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center, HStack,
} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import oomlLogo from '../../assets/img/oomlLogo.png';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import jsCookie from "js-cookie";

const Nav = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);

    const getLogout = () => {
        jsCookie.remove("ooml-auth-token");
        navigate('/');
    };

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box><img src={oomlLogo} style={{width: "50px"}}/></Box>

                    <HStack spacing={8} alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{base: 'none', md: 'flex'}}>
                            <NavLink to={"/"}>ads</NavLink>
                            <NavLink to={"/"}>ads</NavLink>
                            <NavLink to={"/"}>ads</NavLink>
                        </HStack>
                    </HStack>


                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://sade.network/assets/img/user.png'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br/>
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://sade.network/assets/img/user.png'}
                                        />
                                    </Center>
                                    <br/>
                                    <Center>
                                        <p>{user?.nameSurname}</p>
                                    </Center>
                                    <br/>
                                    <MenuDivider/>
                                    <MenuItem onClick={() => navigate('profil')}>Profil</MenuItem>
                                    <MenuItem onClick={getLogout}>Çıkış Yap</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>

                </Flex>
            </Box>

        </>
    );
}

export default Nav;