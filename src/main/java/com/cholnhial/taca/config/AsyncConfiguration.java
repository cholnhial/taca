package com.cholnhial.taca.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.aop.interceptor.SimpleAsyncUncaughtExceptionHandler;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Callable;
import java.util.concurrent.Executor;
import java.util.concurrent.Future;

@Configuration
@EnableAsync
@EnableScheduling
@Slf4j
public class AsyncConfiguration implements AsyncConfigurer {

    /* Copied from the Jhipster project
    * https://github.com/jhipster/jhipster/blob/main/jhipster-framework/src/main/java/io/github/jhipster/async/ExceptionHandlingAsyncTaskExecutor.java
    *
    *  */
    @Slf4j
    private static class ExceptionHandlingAsyncTaskExecutor implements AsyncTaskExecutor,
            InitializingBean, DisposableBean {

        static final String EXCEPTION_MESSAGE = "Caught async exception";


        private final AsyncTaskExecutor executor;

        /**
         * <p>Constructor for ExceptionHandlingAsyncTaskExecutor.</p>
         *
         * @param executor a {@link org.springframework.core.task.AsyncTaskExecutor} object.
         */
        public ExceptionHandlingAsyncTaskExecutor(AsyncTaskExecutor executor) {
            this.executor = executor;
        }

        /** {@inheritDoc} */
        @Override
        public void execute(Runnable task) {
            executor.execute(createWrappedRunnable(task));
        }

        /** {@inheritDoc} */
        @Override
        public void execute(Runnable task, long startTimeout) {
            executor.execute(createWrappedRunnable(task), startTimeout);
        }

        private <T> Callable<T> createCallable(final Callable<T> task) {
            return () -> {
                try {
                    return task.call();
                } catch (Exception e) {
                    handle(e);
                    throw e;
                }
            };
        }

        private Runnable createWrappedRunnable(final Runnable task) {
            return () -> {
                try {
                    task.run();
                } catch (Exception e) {
                    handle(e);
                }
            };
        }

        /**
         * <p>handle.</p>
         *
         * @param e a {@link java.lang.Exception} object.
         */
        protected void handle(Exception e) {
            log.error(EXCEPTION_MESSAGE, e);
        }

        /** {@inheritDoc} */
        @Override
        public Future<?> submit(Runnable task) {
            return executor.submit(createWrappedRunnable(task));
        }

        /** {@inheritDoc} */
        @Override
        public <T> Future<T> submit(Callable<T> task) {
            return executor.submit(createCallable(task));
        }

        /** {@inheritDoc} */
        @Override
        public void destroy() throws Exception {
            if (executor instanceof DisposableBean) {
                DisposableBean bean = (DisposableBean) executor;
                bean.destroy();
            }
        }

        /** {@inheritDoc} */
        @Override
        public void afterPropertiesSet() throws Exception {
            if (executor instanceof InitializingBean) {
                InitializingBean bean = (InitializingBean) executor;
                bean.afterPropertiesSet();
            }
        }
    }
    @Override
    @Bean(name = "taskExecutor")
    public Executor getAsyncExecutor() {
        log.debug("Creating Async Task Executor");
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(10000);
        executor.setThreadNamePrefix("taca-Executor-");
        return new ExceptionHandlingAsyncTaskExecutor(executor);
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new SimpleAsyncUncaughtExceptionHandler();
    }
}
