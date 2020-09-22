import React from 'react'
import LanguagesNav from './LanguagesNav'
import Loading from './Loading'
import ReposGrid from './ReposGrid'
import { getPopularRepos } from './utils/api'

export default class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: {},
        error: null
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }
    
    updateLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage,
            error: null
        })

        if(!this.state.repos[selectedLanguage])
        {
            getPopularRepos(selectedLanguage)
            .then((data) => {
                this.setState(({ repos }) => ({
                    repos: {
                        ...repos,
                        [selectedLanguage]: data
                    }
                }))
            })
            .catch(() => {
                console.warn('Error fetching repos: ', error)
                this.setState({
                    error: 'Error in fetching the repositories.'
                })
            })
        }
    }

    isLoading = () => {
        const { selectedLanguage, repos, error} = this.state
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state
        
        return (
            <React.Fragment>
                <LanguagesNav selected={selectedLanguage} onUpdateLanguage={this.updateLanguage}/>
                {this.isLoading() && <Loading speed={100}/>}
                {error && <p className='center-text error'>{error}</p>}
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}
            </React.Fragment>
        )
    }
}