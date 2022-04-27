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
    Center, BreadcrumbItem, BreadcrumbLink, Breadcrumb,
} from '@chakra-ui/react';
import {ChevronRightIcon, MoonIcon, SunIcon} from '@chakra-ui/icons';
import oomlLogo from '../../assets/img/oomlLogo.png';

const Nav = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box><img src={oomlLogo} style={{width: "50px"}}/></Box>
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
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br/>
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br/>
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br/>
                                    <MenuDivider/>
                                    <MenuItem>Your Servers</MenuItem>
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>

            <Box bg={useColorModeValue('gray.200', 'gray.700')}>
                <Flex>
                    <Stack padding="5px 20px">
                        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500'/>}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink href='#'>About</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Stack>
                </Flex>
            </Box>

        </>
    );
}

export default Nav;