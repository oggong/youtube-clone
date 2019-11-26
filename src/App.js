import React from 'react';

import { Grid } from '@material-ui/core';

import youtube from './api/youtube';

import { SearchBar, VideoDetail, VideoList } from './components/index';

class App extends React.Component {

    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount(){
        this.handleSubmit('pdf generation with react and node')
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    handleSubmit = async (searchTerm) => { //refactoring
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: "", //google key
                q: searchTerm
            }
        });
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
        // console.log(response.data.items);
    }

    render() {
        const { selectedVideo, videos } = this.state;

        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            {/* SEARCH BAR */}
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            {/* VIDEO DETAILS */}
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            {/*VIDEO LIST */}
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;