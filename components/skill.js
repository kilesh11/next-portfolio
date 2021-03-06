import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WebIcon from '@material-ui/icons/Web';
import StorageIcon from '@material-ui/icons/Storage';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { COLOR } from '@/lib/constants';

const convertDisplayType = {
    frontend: 'Frontend',
    backend: 'Backend',
    devops: 'DevOps',
};

const useStyles = makeStyles({
    colorPrimary: {
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    frontendBarPrimary: {
        backgroundColor: COLOR.frontend.icon,
        borderRadius: '999px',
    },
    backendBarPrimary: {
        backgroundColor: COLOR.backend.icon,
        borderRadius: '999px',
    },
    devopsBarPrimary: {
        backgroundColor: COLOR.devops.icon,
        borderRadius: '999px',
    },
});

const style = { width: 120, height: 120 };

const Skill = ({ skills }) => {
    const classes = useStyles();
    return (
        <section>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                Skills.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 md:col-gap-4 lg:col-gap-6 row-gap-10 md:row-gap-20 my-16">
                {['frontend', 'backend', 'devops'].map((type) => (
                    <div
                        key={type}
                        className="flex flex-col items-center py-20 px-10 rounded-lg shadow-xl"
                    >
                        <div className="flex flex-col mb-10 items-center">
                            {type == 'frontend' && (
                                <WebIcon style={{ ...style, color: COLOR[type].icon }} />
                            )}
                            {type == 'backend' && (
                                <StorageIcon style={{ ...style, color: COLOR[type].icon }} />
                            )}
                            {type == 'devops' && (
                                <AllInclusiveIcon style={{ ...style, color: COLOR[type].icon }} />
                            )}
                            <p className="text-2xl font-medium">{convertDisplayType[type]}</p>
                        </div>
                        {skills
                            .filter((skill) => skill.type === type)
                            .map((skill) => (
                                <div
                                    className="flex flex-row w-full my-2 font-medium"
                                    key={skill.name}
                                >
                                    <span style={{ width: 160 }} className="text-left">
                                        {skill.name}
                                    </span>
                                    <LinearProgress
                                        className="self-center w-full rounded-full"
                                        classes={{
                                            colorPrimary: classes.colorPrimary,
                                            barColorPrimary: classes[COLOR[type].barColorPrimary],
                                        }}
                                        style={{ height: 7 }}
                                        variant="determinate"
                                        value={skill.proficiency * 20}
                                    />
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skill;
