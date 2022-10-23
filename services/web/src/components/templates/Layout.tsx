import React from 'react'
import AntLayout from "@components/ui/layout";
import Head from 'next/head';
import Link from '@components/ui/link';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return(
        <>
            <Head>
                <title>Book Log | 積み本防止アプリ</title>
            </Head>
            <AntLayout className='min-h-screen tracking-widest'>
                <AntLayout.Header>
                    <div>
                        <h1>
                            <Link href='/'>
                                <a className='text-white'>Book Log</a>
                            </Link>
                        </h1>
                    </div>
                </AntLayout.Header>
                <AntLayout.Content className='px-4 mx-auto w-full max-w-2xl'>{children}</AntLayout.Content>
                <AntLayout.Footer>
                    <small className='block text-center'>&copy; Copyright. All rights reserved.</small>
                </AntLayout.Footer>
            </AntLayout>
        </>
    );
}

export default Layout
