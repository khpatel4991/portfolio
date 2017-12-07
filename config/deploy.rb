# config valid only for current version of Capistrano
lock "3.10.0"

set :user, 'portfolio'
set :application, "portfolio"
set :repo_url, "git@github.com:khpatel4991/portfolio.git"

set :deploy_to, '/home/portfolio/frontend'

set :keep_releases, 5

set :pty, true

set :ssh_options, {
  forward_agent: true,
  auth_methods: ["publickey"],
  keys: [ENV['AWS_PEM_KEY']]
}

  
append :linked_dirs, "node_modules"

pm2 = "/home/portfolio/.npm-global/bin/pm2"

namespace :deploy do
  #before :updated, :link_secrets
  after :updated, :npm_install
  after :updated, :link_shared_npm_modules
  after :updated, :build_project
  after :finished, :stop_server
  after :finished, :start_server

  desc "Check Logs"
  task :check_logs do
    on release_roles(:all) do
      within release_path do
        execute "cd #{fetch(:deploy_to)}/current/ && #{pm2} logs #{fetch(:application)}"
      end
    end
  end
  

  desc "Install Node Packages"
  task :npm_install do
    on release_roles(:all) do
      within release_path do
        execute "cd #{release_path}/ && yarn -s"
      end
    end
  end

  desc "Link new modules with the shared one"
  task :link_shared_npm_modules do
    on release_roles(:all) do
      within release_path do
        execute "ln -sf #{release_path}/node_modules #{fetch(:deploy_to)}/shared/node_modules"
      end
    end
  end

  desc "Hard Link the secrets file"
  task :link_secrets do
    on release_roles(:all) do
      within release_path do
        execute "ln #{fetch(:deploy_to)}/shared/config/secrets.json #{release_path}/src/config/secrets.json"
      end
    end
  end

  desc "Build Now Project"
  task :build_project do
    on release_roles(:all) do
      within release_path do
        execute "cd #{release_path}/ && yarn run build"
      end
    end
  end


  desc "Start the Server"
  task :start_server do
    on release_roles(:all) do
      within release_path do
        execute "cd #{fetch(:deploy_to)}/current/ && #{pm2} start npm --name \"#{fetch(:application)}\" -- start"
      end
    end
  end
  
  desc "Stop existing server"
  task :stop_server do  on release_roles(:all) do
      within release_path do
        execute "cd #{fetch(:deploy_to)}/current/ && #{pm2} delete #{fetch(:application)}"
      end
    end
  end

  desc "Restart server"
  task :restart_server do
    on release_roles(:all) do
      within release_path do
        execute "cd #{fetch(:deploy_to)}/current/ && #{pm2} restart #{fetch(:application)}"
      end
    end
  end

end