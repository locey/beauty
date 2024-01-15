import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState('');

    // 在组件挂载时加载初始视频
    useEffect(() => {
        loadNextVideo();
    }, []);

    const loadNextVideo = () => {
        const newVideoUrl = `http://api.yujn.cn/api/zzxjj.php?type=video&rand=${Math.random()}`;
        setVideoUrl(newVideoUrl);
    };

    // 监听videoUrl的变化来自动播放新视频
    useEffect(() => {
        if (videoUrl && videoRef.current) {
            videoRef.current.load(); // 加载新视频源
            videoRef.current.play().catch(error => console.error('Error playing video:', error));
        }
    }, [videoUrl]);

    return (
        <div className="video-container">
            <video 
                ref={videoRef} 
                width="720" 
                height="480" 
                controls 
                loop  // 添加循环播放属性
                className="video-player"
            >
                {videoUrl && <source src={videoUrl} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
            <button onClick={loadNextVideo} className="play-button">Next Video</button>
        </div>
    );
};

export default VideoPlayer;
