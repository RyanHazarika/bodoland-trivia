import { Devvit, useState, useAsync } from '@devvit/public-api';

Devvit.configure({
    redditAPI: true,
});

const TRIVIA_DATA = [
    {
        question: "What is the capital of Bodoland Territorial Region?",
        options: ["Kokrajhar", "Guwahati", "Dhubri", "Bongaigaon"],
        correct: 0,
    },
    {
        question: "Which river forms the western boundary of Bodoland?",
        options: ["Brahmaputra", "Manas", "Sankosh", "Dhansiri"],
        correct: 2,
    },
    {
        question: "What is the traditional Bodo dance called?",
        options: ["Bihu", "Bagurumba", "Garba", "Bhortal"],
        correct: 1,
    },
    {
        question: "Which festival marks the Bodo New Year?",
        options: ["Bwisagu", "Ali-Ai-Ligang", "Baishagu", "Rongker"],
        correct: 0,
    },
    {
        question: "What is the traditional Bodo female attire called?",
        options: ["Mekhela", "Dokhona", "Saree", "Phanek"],
        correct: 1,
    },
    {
        question: "Which national park in Bodoland is a UNESCO World Heritage Site?",
        options: ["Kaziranga", "Manas", "Nameri", "Orang"],
        correct: 1,
    },
    {
        question: "What is the traditional Bodo musical instrument made of buffalo horn?",
        options: ["Siphung", "Serja", "Kham", "Jotha"],
        correct: 3,
    },
    {
        question: "Which year was the Bodoland Territorial Council established?",
        options: ["2000", "2003", "1993", "2012"],
        correct: 1,
    },
    {
        question: "What is the traditional Bodo rice beer called?",
        options: ["Zu", "Apong", "Chuak", "Hor"],
        correct: 0,
    },
    {
        question: "Which Bodo festival celebrates agricultural prosperity?",
        options: ["Domashi", "Garja", "Kherai", "Hapsa Hatarnai"],
        correct: 2,
    },
    {
        question: "What is the official language of Bodoland Territorial Council?",
        options: ["Assamese", "Bodo", "Hindi", "English"],
        correct: 1,
    },
    {
        question: "Which freedom fighter is known as 'Birsa Munda of Assam'?",
        options: ["Rupnath Brahma", "Kaloji Ranganath", "Tileswar Brahma", "Sansuma Khunggur Bwiswmuthiary"],
        correct: 0,
    },
    {
        question: "What is the traditional Bodo dish made with pork and bamboo shoots?",
        options: ["Oma Bedor", "Masor Tenga", "Alu Pitika", "Khar"],
        correct: 0,
    },
    {
        question: "Which district is known as the 'Gateway to Bodoland'?",
        options: ["Baksa", "Chirang", "Udalguri", "Kokrajhar"],
        correct: 3,
    },
    {
        question: "What is the sacred grove of Bodos called?",
        options: ["Than", "Mandir", "Gereki", "Basadi"],
        correct: 0,
    },
    {
        question: "Which Bodo leader signed the historic Bodo Accord in 2020?",
        options: ["Hagrama Mohilary", "Pramod Boro", "Upen Brahma", "Chandra Mohan Patowary"],
        correct: 1,
    },
    {
        question: "What is the traditional Bodo handloom product?",
        options: ["Muga Silk", "Eri Silk", "Dokhona Fabric", "Gamocha"],
        correct: 2,
    },
    {
        question: "Which animal is the mascot of Manas National Park?",
        options: ["Golden Langur", "One-horned Rhino", "Asian Elephant", "Bengal Tiger"],
        correct: 0,
    },
    {
        question: "What is the traditional Bodo method of fishing called?",
        options: ["Jakoi", "Chepa", "Khaloi", "Polok"],
        correct: 2,
    },
    {
        question: "Which Bodoland district has the highest literacy rate?",
        options: ["Baksa", "Chirang", "Udalguri", "Kokrajhar"],
        correct: 3,
    },
    {
        question: "What is the traditional Bodo martial art called?",
        options: ["Thang-Ta", "Kalaripayattu", "Musti Yuddha", "Khor-kati"],
        correct: 3,
    },
    {
        question: "Which Bodoland district is famous for tea production?",
        options: ["Udalguri", "Baksa", "Chirang", "Kokrajhar"],
        correct: 0,
    },
    {
        question: "What is the traditional Bodo method of rice cultivation?",
        options: ["Jhum", "Ahu", "Sali", "Boro"],
        correct: 0,
    },
    {
        question: "Which Bodoland town hosts the annual Spring Festival?",
        options: ["Kokrajhar", "Udalguri", "Kajalgaon", "Tamulpur"],
        correct: 0,
    },
    {
        question: "What is the traditional Bodo headgear for men called?",
        options: ["Gamosa", "Japi", "Argon", "Paguri"],
        correct: 3,
    }
];

Devvit.configure({
    redditAPI: true,
});

Devvit.addMenuItem({
    label: 'Create Bodoland Trivia',
    location: 'subreddit',
    forUserType: 'moderator',
    onPress: async (_, context) => {
        const { reddit, ui } = context;
        ui.showToast("Creating trivia post...");

        try {
            const subreddit = await reddit.getCurrentSubreddit();
            const post = await reddit.submitPost({
                title: '🧠 Bodoland Trivia Challenge!',
                subredditName: subreddit.name,
                preview: (
                    <vstack alignment="center middle" height="100%" width="100%">
                        <custom postType="Bodoland Trivia" />
                    </vstack>
                ),
            });
            ui.navigateTo(post);
        } catch (error) {
            console.error("Error creating post:", error);
            ui.showToast("Failed to create trivia post.");
        }
    },
});

Devvit.addCustomPostType({
    name: 'Bodoland Trivia',
    height: 'regular',
    render: (context) => {
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [score, setScore] = useState(0);
        const [quizCompleted, setQuizCompleted] = useState(false);
        const [isSharing, setIsSharing] = useState(false);



        const { data: userProfile, loading: userLoading, error: userError } = useAsync(
            async () => {
                try{
                  const user = await context.reddit.getUserById(context.userId);
                  return {
                      name: user.username,
                      icon: user.iconImg || '',
                  };
                } catch(e){
                    return {
                        name: 'Anonymous Player',
                        icon: '',
                    };
                }

            },
            { depends: [] }
        );



        const handleAnswer = (selectedIndex) => {
            if (TRIVIA_DATA[currentQuestion].correct === selectedIndex) {
                setScore(score + 1);
                context.ui.showToast("Correct! 🎉");
            } else {
                context.ui.showToast("Wrong answer ❌");
            }

            if (currentQuestion < TRIVIA_DATA.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setQuizCompleted(true);
            }
        };

        const restartQuiz = () => {
            setCurrentQuestion(0);
            setScore(0);
            setQuizCompleted(false);
        };

        const shareScore = async () => {
            try {
                setIsSharing(true);
                const subreddit = await context.reddit.getCurrentSubreddit();

                const postTitle = `🏆 ${userProfile.name} scored ${score}/${TRIVIA_DATA.length} in Bodoland Trivia!`;
                const postPreview = (
                    <vstack alignment="center middle" padding="medium" gap="medium" backgroundColor="#f0f4f8">
                        <hstack alignment="center" gap="medium">
                            {userProfile.icon && (
                                <image
                                    url={userProfile.icon}
                                    imageHeight={80}
                                    imageWidth={80}
                                    cornerRadius="full"
                                    border="thick"
                                    borderColor="#1e40af"
                                />
                            )}
                            <vstack gap="xsmall">
                                <text size="large" weight="bold" color="#1e3a8a">{userProfile.name}'s Score</text>
                                <text size="xxlarge" weight="heavy" color="#2563eb">{score}</text>
                                <text size="small" color="#64748b">Out of {TRIVIA_DATA.length} questions</text>
                            </vstack>
                        </hstack>
                        <button appearance="primary" disabled={true}>
                            Take the Challenge
                        </button>
                    </vstack>
                );


                await context.reddit.submitPost({
                    title: postTitle,
                    subredditName: subreddit.name,
                    preview: postPreview,
                });

                context.ui.showToast("Score shared successfully! 🎉");
            } catch (error) {
                console.error("Error sharing score:", error);
                context.ui.showToast("Failed to share score. Please try again!");
            } finally {
                setIsSharing(false);
            }
        };

        return (
            <vstack gap="small" padding="medium" alignment="center middle" width="100%">
                <text size="medium" weight="bold" color="#1e3a8a">
                    🧠 Bodoland Cultural Trivia
                </text>

                {!quizCompleted ? (
                    <>
                        <text
                            size="small"
                            alignment="middle"
                            width="100%"
                            padding="small"
                            color="#334155"
                            wrap // Enable text wrapping
                            style={{ whiteSpace: 'normal' }}
                        >
                            {TRIVIA_DATA[currentQuestion].question}
                        </text>

                        <vstack gap="xsmall" width="100%">
                            {TRIVIA_DATA[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onPress={() => handleAnswer(index)}
                                    width="100%"
                                    appearance="primary"
                                    padding="small"
                                >
                                    {option}
                                </button>
                            ))}
                        </vstack>

                        <text size="xsmall" alignment="middle" padding="small" color="#64748b">
                            {`Question ${currentQuestion + 1} of ${TRIVIA_DATA.length}`}
                        </text>
                    </>
                ) : (
                    <>
                        <vstack gap="medium" alignment="center middle" width="100%">
                            <text size="medium" alignment="middle" weight="bold" color="#1e3a8a">
                                🎉 Quiz Complete! 🎉
                            </text>
                            {userLoading ? (
                                <text>Loading...</text>
                            ) : userError ? (
                                <text>Error fetching user data.</text>
                            ) : (
                            <hstack gap="medium" alignment="center middle">

                                    <image
                                        url={userProfile.icon}
                                        imageHeight={64}
                                        imageWidth={64}
                                        cornerRadius="full"
                                        border="medium"
                                        borderColor="#1e40af"
                                    />

                                <vstack gap="xsmall">
                                    <text size="large" weight="bold" color="#1e3a8a">{userProfile.name}'s Score</text>
                                    <text size="xlarge" weight="heavy" color="#2563eb">{score}/{TRIVIA_DATA.length}</text>
                                </vstack>
                            </hstack>
                            )}
                            <hstack gap="small">
                                <button onPress={restartQuiz} appearance="primary" padding="medium">
                                    Play Again
                                </button>
                                <button
                                    onPress={shareScore}
                                    appearance="secondary"
                                    padding="medium"
                                    disabled={isSharing}
                                >
                                    {isSharing ? "Sharing..." : "Share Score"}
                                </button>
                            </hstack>
                        </vstack>
                    </>
                )}
            </vstack>
        );
    },
});

export default Devvit;
