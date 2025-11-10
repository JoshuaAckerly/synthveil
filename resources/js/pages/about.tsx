import Main from '@/layouts/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
    return (
        <Main>
            <div className="mx-auto max-w-4xl px-6 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Synth Veil</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Exploring the boundaries of ambient electronic music
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardContent className="p-8">
                            <h3 className="text-xl font-semibold mb-4">Our Sound</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Synth Veil is an exploration of ambient soundscapes and modular synthesis, 
                                creating immersive audio experiences that blur the boundaries between electronic 
                                and organic sound.
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-8">
                            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Through live performances and studio recordings, we craft atmospheric compositions 
                                that invite listeners into contemplative sonic spaces.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                
                <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-semibold mb-4">Experience the Journey</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Join us as we explore the depths of ambient electronic music and create 
                            soundscapes that transport you to otherworldly realms.
                        </p>
                        <Button size="lg">Listen to Our Music</Button>
                    </CardContent>
                </Card>
            </div>
        </Main>
    );
}