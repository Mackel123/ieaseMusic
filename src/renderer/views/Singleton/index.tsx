import { useStore } from '@/context';
import { IconButton } from '@material-ui/core';
import { FavoriteSharp } from '@material-ui/icons';
import classnames from 'classnames';
import Header from 'components/Header';
import ProgressImage from 'components/ProgressImage';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useUpdateEffect } from 'react-use';
import colors from 'utils/colors';
import helper from 'utils/helper';
import * as styles from './index.less';

const Singleton: React.SFC = observer(() => {
    const { me, controller } = useStore();
    const circleRef = React.useRef<HTMLDivElement>();

    const { isLiked, like, unlike } = me;
    const { song, playing } = controller;
    const liked = isLiked(song.id);

    useUpdateEffect(() => {
        const ele = circleRef.current;
        if (!ele) return;
        if (playing) {
            ele.firstElementChild.classList.remove(styles.pause);
        } else {
            ele.firstElementChild.classList.add(styles.pause);
        }
    }, [playing]);

    return (
        <div className={styles.container}>
            <Header
                {...{
                    transparent: true,
                    showBack: true
                }}
            />

            <summary>
                <IconButton
                    className={classnames({
                        [styles.liked]: liked
                    })}
                    style={{
                        cursor: 'pointer',
                        display: 'table'
                    }}
                    onClick={() => (liked ? unlike(song) : like(song))}>
                    <FavoriteSharp />
                </IconButton>

                <span className={styles.highquality}>{helper.getRate(song)}</span>
            </summary>

            <main>
                <div
                    className={styles.circle}
                    style={{
                        filter: `drop-shadow(3mm 6mm 12mm ${colors.randomColor()})`
                    }}
                    ref={circleRef}>
                    <ProgressImage
                        {...{
                            width: 260,
                            height: 260,
                            src: `${song.album.cover.replace(/\?.*$/, '')}?param=200y200`
                        }}
                    />
                </div>
            </main>
        </div>
    );
});

export default Singleton;
